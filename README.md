# Book bus API

School assignment for early summer 2022, for the course Webserver & Databaser.\
This is a express server with a small database for a library.

## How to use:

### Get all books:
>```
> fetch('https://localhost:4000/books')\
>  .then(res=>res.json())\
>  .then(json=>console.log(json))
>```

### Get a book:

>```
> fetch('https://localhost:4000/books/:id')\
>  .then(res=>res.json())\
>  .then(json=>console.log(json));
>```

### Post new book:
>```
> fetch("http://localhost:4000/books", {\
>  method: "POST",\
>  body: JSON.stringify(\
> {\
>  title: "New Book"\
>  author: "Author Name"\
>  genre: "Genre"
>  }),\
>  headers: {\
>  "Content-Type": "application/json"\
> }});
>```

### Edit book with PUT:

>```
> fetch("http://localhost:4000/books/:id", {\
> method: "PUT",\
> body: JSON.stringify(\
> {\
> title: "Edited title",\
> author: "Edited author",\
> genre: "Edited genre"\
> }),\
> headers: {\
> "Content-Type": "application/json"\
> }});
>```

### Edit title with PATCH:

>```
> fetch("http://localhost:4000/books/:id", {\
> method: "PATCH",\
> body: JSON.stringify(\
> {\
> title: "Edited title"\
> }),\
> headers: {\
> "Content-Type": "application/json"\
> }});
>```

### Delete book:
>```
> fetch("http://localhost:4000/books/:id", {\
> method: "DELETE"\
> });
>```