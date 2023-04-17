'use client'
import React, { useState, useRef, useEffect } from 'react'
import { db } from '../config';
import Link from 'next/link'

const Sidebar = (): JSX.Element => {
  const [lists, setLists] = useState<{ id: string; name: string }[]>([]);
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

  const firebaseAdd = (name: string) => {
    // sanitize input turn it to slug
    const slug_id = name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
    try {
      db.ref("lists/" + slug_id).set({name: input});
    } catch (error) {
      console.error('Error adding:', error);
    }
    setLists([...lists, { id: slug_id, name: input }]);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
      if (input !== '') {
        firebaseAdd(input);
      }
      setShowNew(false);
      setInput('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (input !== '') {
        firebaseAdd(input);
      }
      setShowNew(false);
      setInput('');
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.currentTarget.value);
  };

  const firstLetter = (str: string) => {
    return str.charAt(0).toUpperCase();
  };

  return (
    <div className="relative h-full p-3">
      <div className='m-3'>
				<h1 className="text-2xl font-bold">To-Do List</h1>
      </div>
      <div className='my-7'>
        <ul className="space-y-1">
          {lists.map((list) => (
            <li className="flex items-center gap-3 my-2 hover:bg-white/10 p-2 rounded-sm" key={list.id}><div className='bg-blue-500 rounded-sm w-6 flex justify-center items-center text-xs py-1'>{ firstLetter(list.id) }</div><Link href={`/${list.id}`}>{list.name}</Link></li>
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
