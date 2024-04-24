import React from 'react';
import TaskIndicator from './TaskIndicator';
import CreateTask from './createTask/CreateTask';
import { Outlet } from 'react-router-dom';

function Layout() {
    return (
        
        <div>
            <div className='flex md:flex-row w-100vw'>
                <div className="task-container  mx-5 mt-3">
                    <div className='indicator'>
                        <TaskIndicator />
                    </div>
                    <div className='outlet'>
                     <Outlet />
                    </div>
                </div>    
                <div className='task-details grow'>
                    <CreateTask/>
                </div>

            </div>
        </div>


    );
}

export default Layout;