import React from "react";

export type TextNode = {
  type: "text";
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  code?: boolean;
};

export type LinkNode = {
  type: "link";
  url: string;
  children: InlineNode[];
};

export type InlineNode = TextNode | LinkNode;

export type ParagraphNode = {
  type: "paragraph";
  children: InlineNode[];
};

export type HeadingNode = {
  type: "heading";
  level: 1 | 2 | 3 | 4 | 5 | 6;
  children: InlineNode[];
};

export type QuoteNode = {
  type: "quote";
  children: InlineNode[];
};

export type CodeBlockNode = {
  type: "code";
  language?: string;
  children: { type: "text"; text: string }[];
};

export type ImageNode = {
  type: "image";
  image: {
    url: string;
    alternativeText?: string;
    width?: number;
    height?: number;
  };
};

export type ListItemNode = {
  type: "list-item";
  children: (InlineNode | ListNode)[];
};

export type ListNode = {
  type: "list";
  format: "ordered" | "unordered";
  indentLevel?: number;
  children: ListItemNode[];
};

export type BlockNode =
  | ParagraphNode
  | HeadingNode
  | QuoteNode
  | CodeBlockNode
  | ImageNode
  | ListNode;

export type RichTextNode = BlockNode | ListItemNode | InlineNode;

const HEADING_CLASSES: Record<number, string> = {
  1: "text-3xl font-bold md:w-4/5 mx-auto px-6 py-2",
  2: "text-2xl font-bold md:w-4/5 mx-auto px-6 py-2",
  3: "text-xl font-semibold md:w-4/5 mx-auto px-6 py-2",
  4: "text-lg font-semibold md:w-4/5 mx-auto px-6 py-1",
  5: "text-base font-semibold md:w-4/5 mx-auto px-6 py-1",
  6: "text-sm font-semibold md:w-4/5 mx-auto px-6 py-1",
};

function renderText(node: TextNode): React.ReactNode {
  let content: React.ReactNode = node.text;
  if (node.code) content = <code className="font-mono text-sm bg-white/10 rounded px-1">{content}</code>;
  if (node.bold) content = <strong>{content}</strong>;
  if (node.italic) content = <em>{content}</em>;
  if (node.underline) content = <u>{content}</u>;
  if (node.strikethrough) content = <s>{content}</s>;
  return content;
}

function renderInline(node: InlineNode, index: number): React.ReactNode {
  if (node.type === "text") return <React.Fragment key={index}>{renderText(node)}</React.Fragment>;
  if (node.type === "link") {
    return (
      <a
        key={index}
        className="underline"
        href={node.url}
        target="_blank"
        rel="noopener noreferrer"
      >
        {node.children.map(renderInline)}
      </a>
    );
  }
  return null;
}

function renderBlock(node: RichTextNode, index: number): React.ReactNode {
  switch (node.type) {
    case "paragraph":
      return (
        <p key={index} className="text-justify text-lg md:w-4/5 mx-auto px-6 py-3">
          {node.children.map(renderInline)}
        </p>
      );

    case "heading": {
      const Tag = `h${node.level}` as keyof JSX.IntrinsicElements;
      return (
        <Tag key={index} className={HEADING_CLASSES[node.level]}>
          {node.children.map(renderInline)}
        </Tag>
      );
    }

    case "quote":
      return (
        <blockquote
          key={index}
          className="border-l-4 border-current italic opacity-75 md:w-4/5 mx-auto px-6 py-2 my-2"
        >
          {node.children.map(renderInline)}
        </blockquote>
      );

    case "code":
      return (
        <pre
          key={index}
          className="font-mono text-sm bg-white/10 rounded px-4 py-3 md:w-4/5 mx-auto my-2 overflow-x-auto"
        >
          <code>{node.children.map((c) => c.text).join("")}</code>
        </pre>
      );

    case "image":
      return (
        <img
          key={index}
          src={node.image.url}
          alt={node.image.alternativeText ?? ""}
          width={node.image.width}
          height={node.image.height}
          className="rounded-xl mx-auto my-4 max-w-full"
        />
      );

    case "list": {
      const ListTag = node.format === "ordered" ? "ol" : "ul";
      const listClass =
        node.format === "ordered"
          ? "list-decimal list-inside md:w-4/5 mx-auto px-6 py-1"
          : "list-disc list-inside md:w-4/5 mx-auto px-6 py-1";
      return (
        <ListTag key={index} className={listClass}>
          {node.children.map((item, i) => renderBlock(item, i))}
        </ListTag>
      );
    }

    case "list-item":
      return (
        <li key={index}>
          {node.children.map((child, i) =>
            child.type === "list" ? renderBlock(child, i) : renderInline(child as InlineNode, i)
          )}
        </li>
      );

    case "text":
      return <React.Fragment key={index}>{renderText(node)}</React.Fragment>;

    case "link":
      return renderInline(node, index);

    default:
      return null;
  }
}

interface RichTextRendererProps {
  content?: RichTextNode[];
}

const RichTextRenderer: React.FC<RichTextRendererProps> = ({ content }) => (
  <div className="pb-6">{content?.map(renderBlock)}</div>
);

export default RichTextRenderer;
