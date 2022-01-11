export default function CompletedList({
  completedList,
  setCompletedList,
  showShortDescription,
  auth,
}) {
  // const userCompletedLocalStorage = JSON.stringify(completedList);

  // localStorage.setItem("completdList", userCompletedLocalStorage);

  const removeBook = (id) => {
    const newCompletedArr = completedList.filter((book) => {
      return book.id !== id;
    });
    setCompletedList(newCompletedArr);
  };

  const completedElement = completedList.map((book) => (
    <div key={book.id}>
      <h3>{book.title}</h3>
      <h4>{book.author}</h4>
      <img src={book.imgUrl} />
      <h5>{showShortDescription(book.description)}</h5>
      <button
        onClick={() => {
          removeBook(book.id);
        }}
      >
        Remove
      </button>
    </div>
  ));
  return (
    <div>
      <h1>Completed list page</h1>
      <div>{completedElement}</div>
    </div>
  );
}
