//Constants
const local_storage_notes_key = "notes";

const note_element = "div";
const note_remove_element = "button";
const note_remove_icon_element = "p";
const note_title_element = "span";
const note_content_element = "span";
const notebook_row_element = "div";

const note_instance_class = "note-instance";
const note_remove_class = ["mdl-button", "mdl-js-button", "mdl-button--fab", "mdl-js-ripple-effect", "mdl-button--colored", "remove-note"];
const note_title_class = "note-title";
const note_content_class = "note-content";
const notebook_row_class = "notebook-row";

const note_remove_content = "+";

//Page elements
const create_note = document.getElementById("add-note-button");
const clear_notes = document.getElementById("clear-notes-button");

const new_note_title = document.getElementById('title_input');
const new_note_content = document.getElementById('content_input');
const notebook_container = document.getElementById('notebook-container');

//Variables
let noteObjects;

//Functions
function addNote(note_title_text, note_content_text) {
    let note = createElement(note_element, note_instance_class, null);
    let note_remove = createElement(note_remove_element, note_remove_class, null);
    let note_title = createElement(note_title_element, note_title_class, note_title_text);
    let note_content = createElement(note_content_element, note_content_class, note_content_text);

    let note_id = getRandomUUID();

    note.id = note_id;
    note_remove.appendChild(
        createElement(note_remove_icon_element, null, note_remove_content)
    );
    note.appendChild(note_remove);
    note.appendChild(note_title);
    note.appendChild(note_content);

    addRemoveNoteEvent(note_remove);

    notebook_container.appendChild(note);

    saveNote(note_title.innerHTML, note_content.innerHTML, note_id)
}

function createElement(element_type, element_class, content) {
    let element = document.createElement(element_type);

    if (element_class instanceof Array) {
        element.classList.add(...element_class);
    } else if (element_class != null) {
        element.classList.add(element_class);
    }

    if (content != null) {
        element.innerHTML = content
    }

    return element;
}


function saveNote(note_title, note_content, note_id) {
    let noteObject = {
        id: note_id,
        title: note_title,
        content: note_content
    }

    noteObjects.push(noteObject);
}

function addRemoveNoteEvent(remove_note_button) {
    remove_note_button.onclick = function () {
        let note = this.parentNode;

        noteObjects = noteObjects.filter((item) =>
            item.id != note.id
        );
        note.remove();
    };
}

function getRandomUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
        .replace(/[xy]/g,
            (c, r) => (
                'x' == c ? (r = Math.random() * 16 | 0) : (r & 0x3 | 0x8)
            ).toString(16)
        );
}

//Event listeners
create_note.addEventListener('click', () => {
    let title = new_note_title.value;
    let content = new_note_content.value;

    if (title != "" && content != "") {
        addNote(title, content);
    }
});

clear_notes.addEventListener('click', () => {
    noteObjects = [];

    while (notebook_container.childElementCount > 0) {
        notebook_container.removeChild(
            notebook_container.lastElementChild
        );
    }
});

document.addEventListener('DOMContentLoaded', function () {
    noteObjects = [];
    let notesFromStorage = JSON.parse(localStorage.getItem(local_storage_notes_key));

    if (notesFromStorage != null) {
        notesFromStorage.forEach(noteObject =>
            addNote(noteObject.title, noteObject.content)
        );

        localStorage.removeItem(local_storage_notes_key);
    }
});

window.addEventListener('beforeunload', function () {
    localStorage.setItem(local_storage_notes_key, JSON.stringify(noteObjects));
});