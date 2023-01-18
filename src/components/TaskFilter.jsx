import React from "react";
import MyInput from "./UI/input/MyInput";
import MySelect from "./UI/select/MySelect";
import SidebarSelect from "./UI/select/SidebarSelect";

const TaskFilter = ({filter, setFilter}) => {

    return (
        <div>
            <MyInput
                placeholder="Search"
                value={filter.query}
                onChange={e => setFilter({...filter, query: e.target.value})}
            />
            <SidebarSelect
                value={filter.sort}
                onChange={selectedSort => setFilter({...filter, sort: selectedSort})}
                defaultValue='Sort by'
                options={[
                    {value: 'creationDate', name: 'By creation date'},
                    {value: 'title', name: 'By title'},
                    {value: 'startDate', name: 'By start date'},
                    {value: 'endDate', name: 'By end date'},
                ]}
            />
        </div>
    )
}
export default TaskFilter;