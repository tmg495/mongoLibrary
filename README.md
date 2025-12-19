# mongoLibrary
-----
FILES
-----
books.js: Contains the JSON array of books for initializing the collection.

seed.js: When executed, populates the collection with the contents of books.js.

main.js: Contains all other functions for indexing and querying the collection.

--------------------
FUNCTIONS IN MAIN.JS
--------------------

create_index: Creates an index based on the specified property string. Running each of the commented lines below implements that index for easier querying.

create_book: Adds a book to the collection. Input is a javascript object. The commented lines illustrate how this function can be used to add "Infinite Jest" to the collection.

get_book_by_isbn: Retrieves the book with the ISBN specified as a string. The commented lines below, if run after "Infinite Jest" is added, should return that book.

get_book_by_title: Retrieves the book with the exact title specified as a string. Commented lines should return "The Martian".

update_book: Given an ISBN specified as a string and a javascript object containing the key-value pair(s) to be edited, updates that book in the collection. The commented lines change the description of "Infinite Jest".

delete_book: Removes the entry with the specified ISBN string. Commented lines remove "Infinite Jest".

search_by_author: Returns an array containing all books in the collection with the specified string in the author field. Commented lines return two books by J.K. Rowling.

search_by_genre: Returns an array containing all books in the collection with the specified string in the genres array. Commented lines return all sci-fi books.

search_by_date_range: Given an initial and final publication year, returns an array of all books in the collection published during that period. Commented lines return the books that came out between 1990 and 2000.

topSort: Given an integer, returns an array of that length containing the top-rated books in the collection. Commented lines return a top ten.

title_contains: Given a string, returns all books with that string in the title, case-insensitive. Commented lines return the only book with "magic" in its title currently in the collection.

page_count_by_genre: Given a genre as a string, returns the approximate average page count for all books in that genre. Commented lines do this for Fantasy books.

most_books: Given a property as a string, finds the most common value of that property and how often it appears. Commented lines return the most common author.

average_by_year: Given two years, finds the average of the average user ratings for books published between those years. Commented lines do this for the period between 2010 and 2026.