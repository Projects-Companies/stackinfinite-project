import React, { useEffect, useState } from "react";

interface AuthorDetails {
  id: string;
  name: string;
  age: string;
  pic: any;
}

export default function Index() {
  const [authorDetails, setAuthorDetails] = useState<AuthorDetails>({
    id: "",
    name: "",
    age: "",
    pic: "",
  });
  const [tableData, setTableData] = useState<any>([]);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  useEffect(() => {
    let authorList = localStorage.getItem("authorDetailsList");
    if (authorList) {
      authorList = JSON.parse(authorList);
      if (authorList !== undefined && authorList !== null) {
        if (authorList.length > 0) {
          setTableData(authorList);
        }
      }
    }
  }, []);

  const toBase64 = (file: any) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const inputHandler = async (event: any) => {
    const { value, name, files } = event.target;
    if (name === "name") {
      setAuthorDetails({
        ...authorDetails,
        name: value,
      });
    }
    if (name === "age") {
      setAuthorDetails({
        ...authorDetails,
        age: value,
      });
    }
    if (name === "pic") {
      const b64 = await toBase64(files[0]);
      setAuthorDetails({
        ...authorDetails,
        pic: b64,
      });
    }
  };

  const submitHandler = (e: any) => {
    e.preventDefault()
    let tempAuthorList = [];
    if (!isEdit) {
      tempAuthorList = [
        ...tableData,
        {
          ...authorDetails,
          id: new Date().getTime().toString(),
        },
      ];
    } else {
      tempAuthorList = tableData.map((author: AuthorDetails) => {
        if (author.id === authorDetails.id) {
          return { ...authorDetails };
        } else {
          return author;
        }
      });
    }
    setTableData([...tempAuthorList]);
    localStorage.setItem("authorDetailsList", JSON.stringify(tempAuthorList));
  };

  const preValueHandler = (author: AuthorDetails) => {
    setAuthorDetails({
      ...author,
    });
  };

  const resetAuthorDetails = () => {
    setIsEdit(false);
    setAuthorDetails({
      id: "",
      name: "",
      age: "",
      pic: "",
    });
  };

  const deleteAuthor = (authorId: string) => {
    const tempAuthorList = tableData.filter(
      (author: AuthorDetails) => author.id !== authorId
    );
    if (tempAuthorList.length > 0) {
      setTableData([...tempAuthorList]);
      localStorage.setItem("authorDetailsList", JSON.stringify(tempAuthorList));
    } else {
      setTableData([]);
      localStorage.removeItem("authorDetailsList");
    }
  };

  return (
    <div className="m-4">
      <h2 className="text-center">Authors</h2>
      <div>
        <button
          type="button"
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          style={{ float: "right" }}
          onClick={resetAuthorDetails}
        >
          Add Author
        </button>
      </div>
      {tableData.length > 0 ? (
        //  {/* Table start:- */}
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">ProfilePic</th>
              <th scope="col">AuthorName</th>
              <th scope="col">Age</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((author: AuthorDetails, index: number) => (
              <tr key={index}>
                <td><strong>{author.id}</strong></td>
                <td>
                  <img
                    style={{ borderRadius: "50%" }}
                    src={author.pic}
                    width={"50px"}
                    height={"50px"}
                    alt="N/A"
                  />
                </td>
                <td>{author.name}</td>
                <td>{author.age}</td>
                <td>
                  <>
                    <button
                      type="button"
                      className="btn btn-secondary me-2"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      onClick={() => {
                        preValueHandler(author);
                        setIsEdit(true);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => {
                        deleteAuthor(author.id);
                      }}
                    >
                      Delete
                    </button>
                  </>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "50vh" }}
        >
          <h6 className="text-center text-secondary">Records not found...</h6>
        </div>
      )}

      {/* Modal start:- */}
      <form onSubmit={submitHandler}>
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex={-1}
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Author Details
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="disabledTextInput" className="form-label">
                    Author Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={authorDetails.name}
                    id="disabledTextInput"
                    className="form-control"
                    onChange={inputHandler}
                    required
                  />
                  <label htmlFor="disabledTextInput1" className="form-label">
                    Age
                  </label>
                  <input
                    type="text"
                    name="age"
                    minLength={1}
                    maxLength={2}
                    value={authorDetails.age}
                    id="disabledTextInput1"
                    className="form-control"
                    onChange={inputHandler}
                    required
                  />
                  <label htmlFor="disabledTextInput2" className="form-label">
                    Profile Pic
                  </label>
                  <input
                    accept=".jpg"
                    type="file"
                    name="pic"
                    id="disabledTextInput2"
                    className="form-control"
                    onChange={inputHandler}
                    required
                  />
                  <div className="d-flex justify-content-center mt-4">
                    {authorDetails.pic && (
                      <img
                        src={authorDetails.pic}
                        width={"200px"}
                        alt="loading.."
                      />
                    )}
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  onClick={resetAuthorDetails}
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  data-bs-dismiss="modal"
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
