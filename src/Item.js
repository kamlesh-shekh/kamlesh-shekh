import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { itemAction } from "./store/CrudeSlice";

export let editId;

export default function Item() {
  const [item, setItem] = useState("");
  const [select, setSelect] = useState("All");
  const dispatch = useDispatch();
  const itemShow = useSelector((state) => state.storeData.data);

  let selectData;

  switch (select) {
    case "All":
      selectData = itemShow;
      break;
    case "Checked":
      const che = itemShow.slice();
      selectData = che.filter((cur) => cur.paked === true);
      break;
    case "Unchecked":
      const unche = itemShow.slice();
      selectData = unche.filter((cur) => cur.paked === false);
      break;
    default:
      return;
  }

  const submitHandl = (e) => {
    e.preventDefault();
    if (!item) return;
    dispatch(itemAction.addItem({ item }));
    setItem("");
    editId = "";
  };

  const eidtHandl = (id) => {
    setItem(itemShow.find((cur) => cur.id === id).item);
    editId = id;
  };

  const deletHandl = (id) => {
    dispatch(itemAction.deleteItem(id));
  };

  return (
    <div className="container  mt-5">
      <div className="row">
        <div className="col-md-6 m-auto bg-info rounded ">
          <h2 className="bg-danger text-center">Task</h2>
          <form
            onSubmit={submitHandl}
            className="d-flex gap-4 justify-content-center"
          >
            <input
              type="text"
              name=""
              value={item}
              onChange={(e) => setItem(e.target.value)}
              className="form-control w-50"
              placeholder="Item..."
            />
            <button type="submit" className="btn btn-success">
              Add
            </button>

            <select
              className="rounded"
              value={select}
              onChange={(e) => setSelect(e.target.value)}
            >
              <option value="All">All</option>
              <option value="Checked">Checked</option>
              <option value="Unchecked">Unchecked</option>
            </select>
          </form>
          <hr />
          <ul
            className="list-unstyled overflow-auto "
            style={{ height: "400px" }}
          >
            <List
              itemShow={itemShow}
              selectData={selectData}
              eidtHandl={eidtHandl}
              deletHandl={deletHandl}
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

function List({ selectData, eidtHandl, deletHandl }) {
  return selectData.map((cur, i) => (
    <ItemDiscription
      cur={cur}
      key={i}
      eidtHandl={eidtHandl}
      deletHandl={deletHandl}
    />
  ));
}

function ItemDiscription({ cur, eidtHandl, deletHandl }) {
  const dispatch = useDispatch();
  return (
    <li className="mb-3 p-2 rounded bg-success d-flex gap-2 align-items-center">
      <input
        type="checkbox"
        checked={cur.paked}
        onChange={() => dispatch(itemAction.pakedItem(cur.id))}
      />
      <span
        style={cur.paked ? { textDecoration: "line-through" } : {}}
        className="me-auto"
      >
        {cur.item}
      </span>
      <button className="btn btn-primary" onClick={() => eidtHandl(cur.id)}>
        Edit
      </button>
      <button className="btn btn-danger" onClick={() => deletHandl(cur.id)}>
        Delete
      </button>
    </li>
  );
}
