export function getMockFavQuotes() {
  return [
    { id: 1, body: 'Quote 1 Body', authorId: 1, authorName: 'Author 1', categoryId: 2, isFavourite: true },
    { id: 2, body: 'Quote 2 Body', authorId: 1, authorName: 'Author 2', categoryId: 1, isFavourite: true },
    { id: 3, body: 'Quote 3 Body', authorId: 1, authorName: 'Author 3', categoryId: 3, isFavourite: true }
  ];
}
