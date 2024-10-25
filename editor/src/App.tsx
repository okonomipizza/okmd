import { useEffect, useState } from 'react'
import './App.css'
import HtmlDisplay from './htmlDisplay'
import { FaEdit, FaBars } from 'react-icons/fa';
import { VscSplitHorizontal } from 'react-icons/vsc';
import init, {md_to_html} from '../wasm_pkg/md_to_html.js';




function App() {
  const [editMode, setEditMode] = useState(false);
  const [splitView, setSplitView] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [markdown, setMarkdown] = useState("# Hello World");
  const [html, setHtml] = useState("");

  useEffect(() => {
    const initializeWasm = async () => {
      await init();
      setHtml(md_to_html(markdown));
    };
    initializeWasm();
  }, [markdown])
  return (
    <>
      {/* App Bar */}
      <div className='bg-gray-800 text-white p-4 fixed top-0 left-0 right-0 z-10'>
        <div className='flex justify-between items-center'>
        <h1 className='text-xl font-bold'>OK Markdown</h1>
        <button
            onClick={() => setSidebarOpen(!sidebarOpen)} // Toggle sidebar
            className='p-2 text-white rounded'
          >
            <FaBars /> {/* Sidebar toggle icon */}
          </button>
        </div>
      </div>

      {/* Tool Bar */}
      <div className='bg-gray-700 text-white p-2 fixed top-16 left-0 right-0 z-10'>
        <div className='flex justify-start space-x-4'>
        <button
          onClick={() => setEditMode(prev => !prev)}
          className='mb-4 p-2 bg-blue-500 text-white rounded'
        >
          <FaEdit />
        </button>
        <button
          onClick={() => setSplitView(prev => !prev)}
          className='mb-4 p-2 bg-blue-500 text-white rounded'
        >
          <VscSplitHorizontal />
        </button>
        </div>
      </div>

      {/* Sidebar */}
      {sidebarOpen && (
        <div className="fixed top-16 left-0 w-64 h-full bg-gray-800 text-white p-4 z-20 shadow-lg">
          <h2 className="text-lg font-bold">Sidebar</h2>
          {/* TODO Add sidebar content here */}
          <ul className="mt-4 space-y-2">
            <li><a href="#" className="hover:underline">Link 1</a></li>
            <li><a href="#" className="hover:underline">Link 2</a></li>
            <li><a href="#" className="hover:underline">Link 3</a></li>
          </ul>
        </div>
      )}

      {/* Main content */}
      <div className='mt-32'>
        {editMode? 
          <div className={`flex gap-4 ${splitView ? 'flex-row' : 'flex-col'}`}>
          <div className={`flex-1 ${splitView ? 'w-1/2' : 'w-full'}`}>
              <textarea
                className='w-full h-64 p-2 border border-gray-300 rounded-md'
                value={markdown}
                onChange={(e) => setMarkdown(e.target.value)}
              />
              </div>
            {splitView && (
              <div className={`flex-1 w-1/2`}>
                <HtmlDisplay htmlContent={html} />
              </div>
              
            )}
          </div>
        :
        <HtmlDisplay htmlContent={html} />
          
        }
        
      </div>
      
    </>
  )
}

export default App
