'use client'
import React, { useState, useRef, useEffect } from 'react'
import { db } from '../config'
import Link from 'next/link'
import  { BiX, BiMenu, BiPlus } from "react-icons/bi"

const Sidebar = (): JSX.Element => {
  const [lists, setLists] = useState<{ id: string; name: string; color: string }[]>([])
  const [showNew, setShowNew] = useState<boolean>(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const [input, setInput] = useState<string>('')
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true)

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    const listsRef = db.ref('lists')
    listsRef.on('value', (snapshot) => {
      let lists = snapshot.val()
      const listsArray = []
      for (let id in lists) {
        listsArray.push({ id, ...lists[id] })
      }
      setLists(listsArray)
    })
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      listsRef.off()
    }
  }, [])
  
  const handleAddList = () => {
    setShowNew(true)
  }

  const firebaseAdd = (name: string) => {
    // sanitize input turn it to slug
    const slug_id = name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')
    let color = randomTailwindColor()
    try {
      db.ref("lists/" + slug_id).set({
        name: input,
        color: color,
    })
    } catch (error) {
      console.error('Error adding:', error)
    }
    setLists([...lists, { id: slug_id, name: input, color: color }])
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
      if (input !== '') {
        firebaseAdd(input)
      }
      setShowNew(false)
      setInput('')
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (input !== '') {
        firebaseAdd(input)
      }
      setShowNew(false)
      setInput('')
    }
  }

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.currentTarget.value)
  }

  const firstLetter = (str: string) => {
    return str.charAt(0).toUpperCase()
  }

  const sidebarToggle = () => {
    const sidebar_close = document.getElementById('sidebar-close')
    const sidebar = document.getElementById('sidebar')
    const main = document.getElementById('main')
    const title = document.getElementById('title')
    const sidebar_taskNames = document.querySelectorAll('.sidebar-taskName')
    if (sidebar?.classList.contains('w-64')) {
      sidebar?.classList.remove('w-64')
      main?.classList.remove('ml-64')
      main?.classList.add('ml-24')
      title?.classList.add('hidden')
      sidebar_taskNames?.forEach((taskName) => {
        taskName.classList.add('hidden')
      })
      setSidebarOpen(false)
    } else {
      sidebar?.classList.add('w-64')
      main?.classList.remove('ml-24')
      main?.classList.add('ml-64')
      title?.classList.remove('hidden')
      sidebar_taskNames?.forEach((taskName) => {
        taskName.classList.remove('hidden')
      })
      setSidebarOpen(true)
    }
  }

  const randomTailwindColor = () => {
    const colors = ['red', 'yellow', 'green', 'blue', 'indigo', 'purple', 'pink', 'teal', 'cyan', 'lime', 'fuchsia', 'rose']
    return colors[Math.floor(Math.random() * colors.length)]
  }

  return (
    <div className="relative h-full p-3">
      <div className='m-3 flex justify-between items-center'>
				<h1 id="title" className="text-2xl font-bold">To-Do List</h1>
        <button id="sidebar-close" onClick={sidebarToggle}>
          {sidebarOpen ? <BiX className='text-3xl'/> : <BiMenu className='text-3xl'/> }
        </button>
      </div>
      <div className='my-7'>
        <ul className="space-y-1">
          {lists.map((list) => (
            <Link href={`/${list.id}`} className="flex items-center gap-5 my-2 hover:bg-white/10 p-2 rounded-md" key={list.id}>
              <div className={`bg-${list.color}-500 rounded-md w-10 flex justify-center items-center text-base py-2`}>
                {firstLetter(list.id)}
              </div>
              <span className='sidebar-taskName truncate'>{list.name}</span>
            </Link>          
          ))}
          {showNew && (
            <input type="text" className="w-full bg-transparent border-b-2" onInput={handleInput} onKeyDown={handleKeyPress} ref={inputRef} />
          )}
        </ul>
        
      </div>
      {!showNew && (
        <button className="absolute bottom-0 left-0 right-0 py-3 flex items-center gap-5 justify-center" onClick={handleAddList}>
          <BiPlus className='text-2xl'/>
          <span className='sidebar-taskName'>New task</span>
        </button>
      )}
    </div>
  )
}

export default Sidebar
