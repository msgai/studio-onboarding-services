import React from 'react';
export interface OwnProps {
    data?: any;
    onDelete?: Function,
}

type Props = OwnProps;
function Table({ data, onDelete }: Props) {
    if(data.length > 0)
    return (
        <div className="p-[20px] bg-white rounded">
            <label style={{color:'#4637d4'}} className='font-[600] text-lg'>Sources Added</label>
            <div className='rounded-tl-[8px] border border-solid rounded-tr-[8px] overflow-hidden'>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                <thead style={{backgroundColor:'#4637d4'}} className="text-base text-white">
                    <tr >
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
                    {data.map((item:any, index:any)=>(
                        <tr key={index} className="bg-white border-b ">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                            {item.sourceName}
                        </th>
                        <td className="px-6 py-4">
                            {item.subType.toLowerCase().split('_').map(d=>d[0].toUpperCase()+d.substring(1)).join(' ')}
                        </td>
                        <td className="px-6 py-4 text-ellipsis ">
                            <a target='__blank' href={item.sourceType=== 'WEB' ?item.webUrl : item.fileUrl} >Click Here</a>
                        </td>
                        <td className="px-6 py-4">
                            <button onClick={()=>onDelete(item)}>Delete</button>
                        </td>
                    </tr>
                    ))}
                    
                </tbody>
            </table>
            </div>
        </div>
    );
    else return
}

export default Table;
