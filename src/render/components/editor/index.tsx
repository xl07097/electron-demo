import { useEffect, useRef } from 'react'

// export default {
//   props: {

//     toolbar: {
//       type: Array,
//       default() {
//         return [
//           ['clean'], // 清除文本格式
//           [{ size: ['small', false, 'large', 'huge'] }], // 字体大小
//           [{ header: [1, 2, 3, 4, 5, 6, false] }], // 标题
//           ['bold', 'italic', 'underline', 'strike'], // 加粗 斜体 下划线 删除线
//           ['blockquote', 'code-block'], // 引用  代码块
//           [{ list: 'ordered' }, { list: 'bullet' }], // 有序、无序列表
//           [{ indent: '-1' }, { indent: '+1' }], // 缩进
//           [{ color: [] }, { background: [] }], // 字体颜色、字体背景颜色
//           [{ align: [] }], // 对齐方式
//           ['link', 'image'], // 链接、图片、视频
//           ['better-table']
//         ]
//       },
//     },
//   },
//   data() {
//     return {
//       options: {
//         theme: 'snow',
//         bounds: document.body,
//         debug: 'warn',
//         modules: {
//           // 工具栏配置
//           // toolbar: ,
//         },
//         placeholder: '请输入内容',
//       },
//     }
//   },
// }

import Quill from 'quill'
import QuillBetterTable from 'quill-better-table'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

type Props = {
	theme?: string
	toolbar?: any
	placeholder?: string
}
const Editor: React.FC<Props> = props => {
	const editorRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		Quill.register(
			{
				'modules/better-table': QuillBetterTable,
			},
			true
		)
		const options = {
			theme: props.theme || 'snow',
			modules: {
				table: false, // disable table module
				'better-table': {
					operationMenu: {
						items: {
							unmergeCells: {
								text: 'Another unmerge cells name',
							},
						},
					},
				},
				keyboard: {
					bindings: QuillBetterTable.keyboardBindings,
				},
				toolbar: props.toolbar,
			},
			placeholder: props.placeholder,
		}
		const quill = new Quill(editorRef.current as HTMLElement, options)
	}, [])

	return <div className="quill-editor" style={{ height: '400px' }} ref={editorRef} />
}
