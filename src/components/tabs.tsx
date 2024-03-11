import React, { useRef, useState } from 'react';
import { Tabs } from 'antd';

type TargetKey = React.MouseEvent | React.KeyboardEvent | string;

const initialItems = [
    { label: 'Dashboard 1', children: '', key: '1' },
];

export const DashboardTab: React.FC = () => {
    const [tablabels, setTabLabels] = useState<string[]>(['Dashboard1']);
    const [activeKey, setActiveKey] = useState(initialItems[0]?.key);
    const [items, setItems] = useState(initialItems);
    const newTabIndex = useRef(0);

    const onChange = (newActiveKey: string) => {
        setActiveKey(newActiveKey);
    };

    const add = () => {
        console.log(tablabels)
        setTabLabels([...tablabels, `Dashboard${tablabels.length + 1}`])
        const newActiveKey = `newTab${newTabIndex.current++}`;
        const newPanes = [...items];
        newPanes.push({ label: `Dashboard${tablabels.length + 1}`, children: '', key: newActiveKey });
        setItems(newPanes);
        setActiveKey(newActiveKey);
    };

    const remove = (targetKey: TargetKey) => {
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
    };

    const onEdit = (
        targetKey: React.MouseEvent | React.KeyboardEvent | string,
        action: 'add' | 'remove',
    ) => {
        if (action === 'add') {
            add();
        } else {
            remove(targetKey);
        }
    };

    return (
        <Tabs
            type="editable-card"
            onChange={onChange}
            activeKey={activeKey}
            onEdit={onEdit}
            items={items}
        />
    );
};

