import { ReactNode } from 'react';
import { Tabs, Tab, TabsProps } from '@nextui-org/react';

// Utils
import { cn } from '@app/utils';

interface TabItem {
  key: string | number | null;
  title: string;
  tabContent: ReactNode;
}

interface CustomTabsProps extends TabsProps {
  tabs: TabItem[];
  selectedKey?: string | number | null;
  onSelectionChange?: (key: string | number) => void;
}

const CustomTabs = ({
  tabs = [],
  selectedKey,
  classNames,
  onSelectionChange,
  ...props
}: CustomTabsProps) => {
  const { base, tabList, tab, tabContent, cursor } = classNames || {};

  const classes = {
    base: 'w-full border-b-1 border-blue-25',
    tabList:
      'w-fit bg-transparent rounded-none pb-0 gap-8.75 md:gap-10 lg:gap-12.5',
    tab: 'px-2 data-[hover-unselected=true]:opacity-100',
    tabContent:
      'w-fit font-primary font-medium text-md lg:text-2xl group-data-[selected=true]:text-blue-200',
    cursor: 'shadow-none rounded-none border-b-2 border-blue-200',
  };

  return (
    <Tabs
      aria-label="Tabs"
      classNames={{
        base: cn(classes.base, base),
        tabList: cn(classes.tabList, tabList),
        tab: cn(classes.tab, tab),
        tabContent: cn(classes.tabContent, tabContent),
        cursor: cn(classes.cursor, cursor),
      }}
      data-testid="custom-tabs"
      selectedKey={selectedKey}
      onSelectionChange={onSelectionChange}
      {...props}
    >
      {tabs?.map((tab) => (
        <Tab
          aria-label={`${tab.title}`}
          data-testid="custom-tab-item"
          key={tab.key}
          title={tab.title}
        >
          {tab.tabContent}
        </Tab>
      ))}
    </Tabs>
  );
};

export default CustomTabs;
