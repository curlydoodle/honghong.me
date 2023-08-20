import { IconFile, IconFolder } from '@tabler/icons-react'
import React from 'react'

type Node = {
  name: string
  children?: Node[]
}

type TreeProps = {
  data: Node[]
}

type InnerType = {
  data: Node[]
  level: number
}

const Tree = (props: TreeProps) => {
  return (
    <div className='rounded-lg border border-accent-2 bg-accent-1 px-6 py-4'>
      <Inner {...props} level={0} />
    </div>
  )
}

const Inner = (props: InnerType) => {
  const { data, level } = props

  return (
    <>
      {data.map((node) => (
        <React.Fragment key={node.name}>
          <div className='relative flex items-center gap-2'>
            {Array.from(Array(level).keys()).map((i) => (
              <div
                key={i}
                className='absolute h-full w-px -translate-x-1/2 bg-accent-2'
                style={{
                  left: `calc(${i * 20}px + 22px / 2)`,
                }}
              />
            ))}
            <div
              style={{
                paddingLeft: level * 24,
              }}
            >
              {!node.children ? (
                <IconFile size={20} />
              ) : (
                <IconFolder size={20} />
              )}
            </div>
            <div className='font-fira-code'>{node.name}</div>
          </div>

          {node.children ? (
            <Inner data={node.children} level={level + 1} />
          ) : null}
        </React.Fragment>
      ))}
    </>
  )
}

export default Tree
