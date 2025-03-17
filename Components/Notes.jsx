import Button from "./Button"

const Note = ({ note, toggleImportance, deleteNote }) => {
  
    return <li className="note">
      {note.content}
      <Button onClick={toggleImportance} text={note.important ? 'make not important': 'make important'} />
      <Button onClick={deleteNote} text={'Eliminar'} />
      </li>
  }
  
  export default Note