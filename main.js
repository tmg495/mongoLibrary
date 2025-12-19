require("dotenv").config();
const { MONGO_PASSWORD } = process.env;
const { MongoClient } = require("mongodb");

const uri = `mongodb+srv://thetomgrant_db_user:${MONGO_PASSWORD}@cluster0.u4ducmb.mongodb.net/`;
const client = new MongoClient(uri);
const database = client.db("Library");
const books = database.collection("libCollection");

async function create_index(property) {
    return books.createIndex({ [property] : 1})
}

// create_index("isbn").then(console.log).finally(() => client.close())
// create_index("title").then(console.log).finally(() => client.close())
// create_index("author").then(console.log).finally(() => client.close())
// create_index("publicationYear").then(console.log).finally(() => client.close())
// create_index("averageRating").then(console.log).finally(() => client.close())
// create_index("genre").then(console.log).finally(() => client.close())
// create_index("pageCount").then(console.log).finally(() => client.close())


async function create_book(book_data) {
    await books.insertOne(book_data)
    return book_data
}

// create_book({
//     title: "Infinite Jest",
//     author: "David Foster Wallace",
//     isbn: "9780316066525",
//     publicationYear: 1996,
//     genres: ["Fiction"],
//     description: "Pretty good book, but its fans are insufferable.",
//     pageCount: 1104,
//     averageRating: 4.2,
//     numberOfRatings: 28
// })
//     .then(console.log)
//     .catch(console.error)
//     .finally(() => client.close());

async function get_book_by_isbn(isbn) {
    const book = await books.findOne({isbn: isbn})
    return book
}

// get_book_by_isbn("9780316066525")
//     .then(console.log)
//     .catch(console.error)
//     .finally(() => client.close());

async function get_book_by_title(title) {
    const book = await books.findOne({title: title})
    return book
}

// get_book_by_title("The Martian")
//     .then(console.log)
//     .catch(console.error)
//     .finally(() => client.close());

async function update_book(isbn, updates) {
    const newBook = books.updateOne({isbn: isbn}, {$set: updates})
    return newBook
}

// update_book("9780316066525", {description: "This is a test."})
//     .then(console.log)
//     .catch(console.error)
//     .finally(() => client.close());

async function delete_book(isbn) {
    books.deleteOne({isbn: isbn})
    return isbn
}

// delete_book("9780316066525")
//     .then(console.log)
//     .catch(console.error)
//     .finally(() => client.close())

async function search_by_author(author) {
    const results = books.find({author: author}).toArray()
    return results
}

// search_by_author("J.K. Rowling")
//     .then(console.log)
//     .catch(console.error)
//     .finally(() => client.close())

async function search_by_genre(genre) {
    const results = books.find({genres: genre}).toArray()
    return results
}

// search_by_genre("Science Fiction")
//     .then(console.log)
//     .catch(console.error)
//     .finally(()=> client.close())

async function search_by_date_range(firstYear, lastYear) {
    const allBooks = books.find().toArray()
    const results = (await allBooks).filter((book) => 
        book.publicationYear >= firstYear &&
        book.publicationYear <= lastYear
    )
    return results
}

// search_by_date_range(1990, 2000)
//     .then(console.log)
//     .catch(console.error)
//     .finally(()=> client.close())

async function topSort(length) {
    const allBooks = await books.find().toArray()
    function compare(a, b) {
        if (a.averageRating > b.averageRating) {
            return -1;
        }
        if (a.averageRating < b.averageRating) {
            return 1;
        }
        return 0
    }
    const sortedBooks = allBooks.sort(compare)
    const results = sortedBooks.slice(0,length)
    return results
}

// topSort(10)
//     .then(console.log)
//     .catch(console.error)
//     .finally(()=> client.close())

async function title_contains(string) {
    const allBooks = books.find().toArray()
    const results = (await allBooks).filter((book) => 
        book.title.toLowerCase().includes(string.toLowerCase())
    )
    return results
}

// title_contains("magic")
//     .then(console.log)
//     .catch(console.error)
//     .finally(()=> client.close())

async function page_count_by_genre(genre) {
    const results = books.find({genres: genre}).toArray();
    let numBooks = 0;
    let totalPages = 0;
    (await results).forEach((book) => {
        numBooks++;
        totalPages += book.pageCount
    })
    avgPages = totalPages/numBooks;
    return Math.floor(avgPages)
}

// page_count_by_genre("Fantasy")
//     .then(console.log)
//     .catch(console.error)
//     .finally(()=> client.close())

async function most_books(property) {
    const allBooks = books.find().toArray();
    const bookMap = new Map();
    (await allBooks).forEach((book) => {
        const key = book.property;
        if (bookMap.has(key)) {
            bookMap.set(key, bookMap.get(key) + 1);
        } else {
            bookMap.set(key, 1);
        }
    })
    return bookMap
}

most_books("author")
    .then(console.log)
    .catch(console.error)
    .finally(()=> client.close())