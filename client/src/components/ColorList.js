import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [addColor, setAddColor] = useState(initialColor);
  const [adding, setAdding] = useState(false);

  const editColor = (color) => {
    setEditing(true);
    setColorToEdit(color);
  };

  const addingColor = () => {
    setAdding(!adding);
  };

  const saveEdit = (e) => {
    e.preventDefault();
    axiosWithAuth()
      .put(`colors/${colors.id}`, colorToEdit)
      .then((res) => {
        console.log("put Request Log colorList:", res);
        updateColors(
          colors.map((color) => (color.id === res.data.id ? res.data : color))
        );
        setEditing(false);
      })
      .catch((err) => console.log(err));
  };

  const deleteColor = (color) => {
    axiosWithAuth()
      .delete(`colors/${color.id}`)
      .then((res) => {
        console.log(res);
        updateColors(colors.filter((color) => color.id !== res.data));
      })
      .catch((err) => console.log(err));
  };

  const addNewColor = () => {
    axiosWithAuth()
      .post("colors", addColor)
      .then((res) => {
        console.log(res);
        updateColors(res.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map((color) => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span
                className="delete"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteColor(color);
                }}
              >
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
        <button className="add-btn" onClick={addingColor}>
          add new color
        </button>
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={(e) =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={(e) =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}

      {adding && (
        <form className="add-color-form" onSubmit={addNewColor}>
          <legend>add color</legend>
          <label>
            color name:
            <input
              onChange={(e) =>
                setAddColor({ ...addColor, color: e.target.value })
              }
              value={addColor.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={(e) =>
                setAddColor({
                  ...addColor,
                  code: { hex: e.target.value }
                })
              }
              value={addColor.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setAdding(false)}>cancel</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ColorList;
