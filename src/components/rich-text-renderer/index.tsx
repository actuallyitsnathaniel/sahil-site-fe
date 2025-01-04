type TextNode = {
  type: "text";
  text: string;
};

type LinkNode = {
  type: "link";
  url: string;
  children: RichTextNode[];
};

type ParagraphNode = {
  type: "paragraph";
  children: RichTextNode[];
};

type RichTextNode = TextNode | LinkNode | ParagraphNode;

interface RichTextRendererProps {
  content?: RichTextNode[];
}

const RichTextRenderer: React.FC<RichTextRendererProps> = ({ content }) => {
  const renderNode = (node: RichTextNode): React.ReactNode => {
    switch (node.type) {
      case "text":
        return node.text;
      case "link":
        return (
          <a
            className="underline"
            href={node.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {node.children.map(renderNode)}
          </a>
        );
      case "paragraph":
        return (
          <p className="text-justify text-lg md:w-4/5 mx-auto px-6 py-3">
            {node.children.map(renderNode)}
          </p>
        );
      default:
        return null;
    }
  };

  return <div className="pb-6">{content?.map(renderNode)}</div>;
};

export default RichTextRenderer;
