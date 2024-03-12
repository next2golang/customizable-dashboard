import React from "react";
import { Tabs, Tab } from "@nextui-org/react";

export const DashboardTabs = () => {
    return (
        <div className="flex w-full flex-col-2 mt-2">
            <Tabs
                aria-label="Options"
                color="default"
                variant="underlined"
                classNames={{
                    tabList: "w-full gap-1 relative rounded-none p-0 border-b border-blue-600 ",
                    cursor: "w-full  bg-white",
                    tab: "w-[100px] px-0 h-10 border-r border-l border-t border-blue-600",
                    tabContent: "group-data-[selected=true]:text-blue-400"
                }}
            >
                <Tab
                    key="photos"
                    title={
                        <div className="flex items-center">
                            <span>Photos</span>
                        </div>
                    }
                />
                <Tab
                    key="music"
                    title={
                        <div className="flex items-center">
                            <span>Music</span>
                        </div>
                    }
                />
                <Tab
                    key="videos"
                    title={
                        <div className="flex items-center">
                            <span>Videos</span>
                        </div>
                    }
                />
            </Tabs>
            <div className="flex items-center text-[30px] text-white ml-2 hover:text-gray-500 hover: cursor-pointer">+</div>
        </div>
    );
}
