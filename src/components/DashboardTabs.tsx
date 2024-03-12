import React, { useRef, useState } from 'react';
import { Tabs, Tab } from "@nextui-org/react";

import { Dashboardcontent } from "~/components/Dashboardcontent";

const initialItems = [
    { title: 'Dashboard 1', children: '', key: '1' },
];

export const DashboardTabs = () => {
    const [tablabels, setTabLabels] = useState<string[]>(['Dashboard1']);
    const [activeKey, setActiveKey] = useState(initialItems[0]?.key);
    const [activeTitle, setActiveTitle] = useState(initialItems[0]?.title);
    const [items, setItems] = useState(initialItems);
    const newTabIndex = useRef(2);

    const add = () => {
        setTabLabels([...tablabels, `Dashboard${tablabels.length + 1}`])
        const newActiveKey = `${newTabIndex.current++}`;
        const newPanes = [...items];
        newPanes.push({ title: `Dashboard${tablabels.length + 1}`, children: '', key: newActiveKey });
        setItems(newPanes);
        setActiveKey(newActiveKey);
        const title = newPanes.filter((item) => item.key === newActiveKey)[0]?.title;
        setActiveTitle(title)
    }

    const remove = (targetKey: string) => {
        let newActiveKey = activeKey;
        let lastIndex = -1;
        items.forEach((item, i) => {
            if (item.key === targetKey) {
                lastIndex = i - 1;
            }
        });
        const newPanes = items.filter((item) => item.key !== targetKey);
        if (newPanes.length && newActiveKey === targetKey) {
            if (lastIndex >= 0) {
                newActiveKey = newPanes[lastIndex]?.key;
            } else {
                newActiveKey = newPanes[0]?.key;
            }
        }
        setItems(newPanes);
        setActiveKey(newActiveKey);
        const title = newPanes.filter((item) => item.key === newActiveKey)[0]?.title;
        setActiveTitle(title)
    };

    const onChange = (key: React.Key) => {
        setActiveKey(key.toString());
        const title = items.filter((item) => item.key === key.toString())[0]?.title;
        setActiveTitle(title)
        console.log(items, '--------', key.toString())
    }

    const handleChangeTitle = (nTitle: string) => {
        setActiveTitle(nTitle)
        const activeItem = items.filter((item) => item.key === activeKey)[0];
        if (activeItem) activeItem.title = nTitle;
    }

    return (
        <>
            <div className="flex relative w-full flex-col-2">
                <Tabs
                    aria-label="Options"
                    color="default"
                    variant="underlined"
                    selectedKey={activeKey}
                    onSelectionChange={onChange}
                    classNames={{
                        tabList: "w-full gap-1 p-0 border-b border-blue-600 ",
                        cursor: "w-full  bg-white",
                        tab: " w-[130px] h-10 border-r border-l border-t border-blue-600",
                        tabContent: "group-data-[selected=true]:text-green-500"
                    }}
                >
                    {items.map((item) => (
                        <Tab
                            key={item.key}
                            title={
                                <div className="flex items-center justify-between">
                                    <span>{item.title}</span>
                                    <span
                                        className="text-[20px] ml-2 text-gray-400 hover:text-blue-500 hover: cursor-default "
                                        onClick={() => remove(item.key)}>
                                        &#215;
                                    </span>
                                </div>

                            }
                        >

                        </Tab>
                    ))}
                </Tabs>
                <div
                    className="flex items-center text-[30px] text-white ml-2 hover:text-gray-500 hover: cursor-pointer"
                    onClick={add}
                >
                    +
                </div>
            </div>
            {activeTitle}
            <Dashboardcontent key={activeKey} title={activeTitle!} onTitleChange={handleChangeTitle} />
        </>
    );
}
