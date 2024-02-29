import React from 'react';
export interface OwnProps {
  data?: any;
  onDelete?: Function;
}

type Props = OwnProps;
function Table({ data, onDelete }: Props) {
  if (data.length > 0)
    return (
      <div className="rounded bg-white p-[20px]">
        <label style={{ color: '#4637d4' }} className="text-lg font-[600]">
          Sources Added
        </label>
        <div className="overflow-hidden rounded-tl-[8px] rounded-tr-[8px] border border-solid">
          <table className="w-full text-left text-sm text-gray-500 rtl:text-right">
            <thead style={{ backgroundColor: '#4637d4' }} className="text-base text-white">
              <tr>
                <th scope="col" className="px-6 py-1 font-[500]">
                  Source Name
                </th>
                <th scope="col" className="px-6 py-1 font-[500]">
                  Source Type
                </th>
                <th scope="col" className="px-6 py-1 font-[500]">
                  Source
                </th>
                <th scope="col" className="px-6 py-1 font-[500]">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((item: any, index: any) => (
                <tr key={index} className="border-b bg-white ">
                  <th scope="row" className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 ">
                    {item.sourceName}
                  </th>
                  <td className="px-6 py-4">
                    {item.subType
                      .toLowerCase()
                      .split('_')
                      .map((d: any) => d[0].toUpperCase() + d.substring(1))
                      .join(' ')}
                  </td>
                  <td className="text-ellipsis px-6 py-4 ">
                    <a target="__blank" href={item.sourceType === 'WEB' ? item.webUrl : item.fileUrl}>
                      Click Here
                    </a>
                  </td>
                  <td className="px-6 py-4">
                    <button onClick={() => onDelete(item)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  else return;
}

export default Table;
