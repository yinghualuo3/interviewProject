import { useState, useRef } from "react";
import { Input, List } from "antd";
import cx from "classnames";
import "./index.less";

/**
 * 1.实现逻辑
 * 1）页面中展示一个输入框（Input组件）和一个列表（List组件）
 * 2）当用户在Input输入内容时 List会根据输入内容对原数组进行过滤展示
 * 3）若点击List的某项 则将该项的name回显到Input中
 * 4）搜索结果中匹配的文字会进行模糊匹配并高亮显示
 * 5）当input聚焦时List部分显示 失焦时隐藏
 */

/**
 * 2.优化
 * 1）键盘处理事件 上下键和回车可实现列表项的切换和选择
 * 2）List模块增加动画效果
 * 3）超长处理
 * 4)其他细节处理
 */

const arrData = [
  {
    id: 1,
    name: "06980",
    address: "https://ant.design/components/overview-cn/",
  },
  {
    id: 2,
    name: "679h",
    address: "https://ant.design/components/overview-cn/",
  },
  {
    id: 3,
    name: "hhhh",
    address: "https://ant.design/components/overview-cn/",
  },
  {
    id: 4,
    name: "lafhdjsasfh",
    address: "https://ant.design/components/overview-cn/",
  },
  {
    id: 5,
    name: "rewqewh",
    address: "https://ant.design/components/overview-cn/",
  },
  {
    id: 6,
    name: "rewfhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh",
    address: "https://ant.design/components/overview-cn/",
  },
  {
    id: 7,
    name: "bgvfdh",
    address:
      "https://ant.design/components/overview-cn/hjhgfgdsffghjkhgfdghjjkhgfdfg",
  },
  //   {
  //     id: 8,
  //     name: "9876ytg",
  //     address: "https://ant.design/components/overview-cn/",
  //   },
  //   {
  //     id: 9,
  //     name: "kmjhgf",
  //     address: "https://ant.design/components/overview-cn/",
  //   },
  //   {
  //     id: 10,
  //     name: "wdfv",
  //     address: "https://ant.design/components/overview-cn/",
  //   },
  //   {
  //     id: 11,
  //     name: "mnbv",
  //     address: "https://ant.design/components/overview-cn/",
  //   },
  //   {
  //     id: 12,
  //     name: "oiuyt",
  //     address: "https://ant.design/components/overview-cn/",
  //   },
];

const ITEM_HEIGHT = 60;

export const SearchPage = () => {
  const listRef = useRef(null);

  const [searchText, setSearchText] = useState(""); // 输入框内容
  const [showList, setShowList] = useState(false); // 是否展示list部分
  const [highlightedIndex, setHighlightedIndex] = useState(-1); // 高亮索引

  // 过滤后显示的数组
  const filteredData =
    arrData?.filter((item: any) =>
      item?.name?.toLowerCase()?.includes(searchText?.toLowerCase())
    ) || [];

  // 点击listItem项回显内容至输入框
  const getItemClick = (item: any) => {
    setSearchText(item?.name);
  };

  // 点击address实现跳转
  const getAddressClick = (address: string) => {
    window.open(address, "_blank");
  };

  // 模糊匹配文字高亮显示
  const getHighlightText = (text: string, inputText: any) => {
    const parts = text.split(new RegExp(`(${inputText})`, "gi"));
    return parts.map((part: string, index: number) => (
      <span
        key={index}
        className={cx({
          "font-bold text-yellowGreen":
            part.toLowerCase() === inputText.toLowerCase(),
        })}
      >
        {part}
      </span>
    ));
  };

  // 键盘上下切换
  const getKeyDown = (e: any) => {
    if (e.key === "ArrowDown") {
      setHighlightedIndex((prevIndex) => {
        const downNum =
          prevIndex < filteredData?.length - 1 ? prevIndex + 1 : 0;
        downNum > 2 &&
          (listRef.current.scrollTop = ITEM_HEIGHT * (downNum - 2));
        downNum === 0 && (listRef.current.scrollTop = 0);
        return downNum;
      });
    } else if (e.key === "ArrowUp") {
      setHighlightedIndex((prevIndex) => {
        const upNum = prevIndex > 0 ? prevIndex - 1 : filteredData?.length - 1;
        listRef.current.scrollTop = ITEM_HEIGHT * (upNum - 2);
        return upNum;
      });
    } else if (e.key === "Enter" && highlightedIndex !== -1) {
      const selectedItem = filteredData[highlightedIndex];
      setSearchText(selectedItem.name);
      setShowList(false);
    }
  };

  return (
    <div className={"w-400 h-80v"}>
      <Input
        placeholder="请输入内容进行搜索"
        value={searchText}
        allowClear
        className={"w-100"}
        onChange={(e) => {
          setSearchText(e.target.value);
          setHighlightedIndex(-1);
        }}
        onFocus={() => setShowList(true)}
        onBlur={() =>
          setTimeout(() => {
            setShowList(false);
          }, 200)
        }
        onKeyDown={getKeyDown}
      />
      {showList && (
        <div
          style={{ height: ITEM_HEIGHT * 3 }}
          className={cx("mt-2 rounded-lg overflow-auto bg-white", {
            listContainer: showList,
            listContainerHidden: !showList,
          })}
          ref={listRef}
        >
          <List dataSource={filteredData} itemLayout="vertical">
            {filteredData?.map((item: any, index: number) => {
              const { id, name, address } = item;
              return (
                <List.Item
                  key={id}
                  style={{ height: ITEM_HEIGHT }}
                  className={cx(
                    "p-2 text-left cursor-pointer hover:bg-grey-200",
                    { "!bg-blue-100": highlightedIndex === index }
                  )}
                  onClick={() => getItemClick(item)}
                >
                  <div className={"px-4"}>
                    <div className={"truncate"}>
                      {getHighlightText(name, searchText)}
                    </div>
                    <div
                      className={
                        "text-grey-300 text-xs cursor-pointer truncate hover:underline"
                      }
                      onClick={() => getAddressClick(address)}
                    >
                      {address}
                    </div>
                  </div>
                </List.Item>
              );
            })}
            {filteredData?.length === 0 && (
              <div
                className={"text-grey-300"}
                style={{ marginTop: ITEM_HEIGHT * 1.2 }}
              >
                暂未搜索到您想要的内容！
              </div>
            )}
          </List>
        </div>
      )}
    </div>
  );
};
