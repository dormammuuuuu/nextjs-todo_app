'use client'
import React, { useState, useRef, useEffect } from 'react'
import { db } from '../config';
import Link from 'next/link'

const Sidebar = (): JSX.Element => {
  const [lists, setLists] = useState<{ id: number; name: string }[]>([]);
  const [showNew, setShowNew] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [input, setInput] = useState<string>('');

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    const listsRef = db.ref('lists');
    listsRef.on('value', (snapshot) => {
      let lists = snapshot.val();
      const listsArray = [];
      for (let id in lists) {
        listsArray.push({ id, ...lists[id] });
      }
      setLists(listsArray);
    });
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      listsRef.off();
    };
  }, []);
  
  const handleAddList = () => {
    setShowNew(true);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
      if (input !== '') {
        try {
          db.ref("lists/" + input).set({color: 'blue-500'});
        } catch (error) {
          console.error('Error adding document:', error);
        }
        setLists([...lists, { id: lists.length + 1, name: input }]);
      }
      setShowNew(false);
      setInput('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (input !== '') {
        try {
          db.ref("lists/" + input).set({color: 'blue-500'});
        } catch (error) {
          console.error('Error adding document:', error);
        }
        setLists([...lists, { id: lists.length + 1, name: input }]);
      }
      setShowNew(false);
      setInput('');
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.currentTarget.value);
  };

  return (
    <div className="relative h-full p-3">
      <div>
				<h1 className="text-2xl font-bold">To-Do Lists</h1>
      </div>
      <div>
        <ul>
          {lists.map((list) => (
            <li className=" my-2" key={list.id}><Link href={`/${list.id}`}>{list.id}</Link></li>
          ))}
          {showNew && (
            <input type="text" className="w-full bg-transparent border-b-2" onInput={handleInput} onKeyDown={handleKeyPress} ref={inputRef} />
          )}
        </ul>
        
      </div>
      {!showNew && (
        <button className="absolute bottom-0 left-0 right-0 p-3 bg-blue-500" onClick={handleAddList}>
          New List
        </button>
      )}
    </div>
  );
};

export default Sidebar;
