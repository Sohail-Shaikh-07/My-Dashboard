document.addEventListener('DOMContentLoaded', function() {
    const noteList = document.getElementById('noteList');
    const noteTitle = document.getElementById('noteTitle');
    const noteContent = document.getElementById('noteContent');
    const saveNoteBtn = document.getElementById('saveNote');

    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    let currentNoteIndex = -1;

    // Initialize particles.js
    if (typeof particlesJS !== 'undefined') {
        particlesJS.load('particles-js', 'particles-config.js');
    }

    function renderNoteList() {
        noteList.innerHTML = '';
        notes.forEach((note, index) => {
            const noteElement = document.createElement('div');
            noteElement.classList.add('note-card');
            noteElement.style.animationDelay = `${index * 0.1}s`;
            noteElement.innerHTML = `
                <h3 class="note-title">${note.title}</h3>
                <p class="note-content">${note.content.substring(0, 50)}${note.content.length > 50 ? '...' : ''}</p>
                <div class="note-footer">
                    <span>${new Date(note.date).toLocaleDateString()}</span>
                    <div class="note-actions">
                        <button class="delete-note" title="Delete Note">
                            <i class="fas fa-trash-alt"></i>
                        </button>
                    </div>
                </div>
            `;

     
            noteElement.querySelector('.note-title').addEventListener('click', () => loadNote(index));
            noteElement.querySelector('.note-content').addEventListener('click', () => loadNote(index));

            noteElement.querySelector('.delete-note').addEventListener('click', (e) => {
                e.stopPropagation();
                deleteNote(index);
            });

            noteList.appendChild(noteElement);
        });
    }

    function loadNote(index) {
        currentNoteIndex = index;
        const note = notes[index];
        noteTitle.value = note.title;
        noteContent.value = note.content;

 
        const form = document.querySelector('.note-editor');
        form.style.animation = 'none';
        form.offsetHeight; 
        form.style.animation = 'fadeInUp 0.5s ease-out';
    }

    function deleteNote(index) {
        if (confirm('Are you sure you want to delete this note?')) {
            notes.splice(index, 1);
            localStorage.setItem('notes', JSON.stringify(notes));
            
     
            if (currentNoteIndex === index) {
                resetNoteEditor();
            }
     
            const noteElement = noteList.children[index];
            noteElement.style.animation = 'fadeOut 0.3s ease-out forwards';
            setTimeout(() => {
                renderNoteList();
            }, 300);
        }
    }

    function saveNote() {
        const title = noteTitle.value.trim();
        const content = noteContent.value.trim();

        if (!title || !content) {
            alert('Please fill in both title and content');
            return;
        }

        const note = {
            title,
            content,
            date: new Date().toISOString()
        };

        if (currentNoteIndex === -1) {
            notes.unshift(note); 
        } else {
            notes[currentNoteIndex] = note;
        }

        localStorage.setItem('notes', JSON.stringify(notes));
        renderNoteList();
        resetNoteEditor();

   
        const saveBtn = document.getElementById('saveNote');
        saveBtn.classList.add('saved');
        setTimeout(() => saveBtn.classList.remove('saved'), 1000);
    }

    function resetNoteEditor() {
        currentNoteIndex = -1;
        noteTitle.value = '';
        noteContent.value = '';
        noteTitle.focus();
    }


    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.key === 's') {
            e.preventDefault();
            saveNote();
        }
    });

    saveNoteBtn.addEventListener('click', saveNote);


    renderNoteList();
});
