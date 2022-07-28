import { useState } from "react";

const AddTask = ( {onAdd} ) => {
    const [text, setText] = useState('');
    const [day, setDay] = useState('');
    const [reminder, setReminder] = useState(false);


const onSubmit = (e =>{
    e.preventDefault();

    if(!text){
        alert('Please enter task..!');
        return;
    }

    onAdd({text, day, reminder});

    // Clear the fields after sumbit
    setText('');
    setDay('');
    setReminder(false);
});

  return (
    <form onSubmit={onSubmit}>
        <div className="form-control">
            <label>Task</label>
            <input type="text" id="task" value={text} onChange={(e) => setText(e.target.value)}/>
        </div>

        <div className="form-control">
            <label>Date & Time</label>
            <input type="text" id="date" value={day} onChange={(e) => setDay(e.target.value)}/>
        </div>

        <div className="form-control from-control-checkbox">
            <label>Reminder</label>
            <input type="checkbox" id="task" checked={reminder} value={reminder} onChange={(e) => setReminder(e.currentTarget.checked)}/>
        </div>

        <input type='submit' className="btn btn-block" value= 'Set Task' />
    </form>
  )
}

export default AddTask