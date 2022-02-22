import siteMetadata from "@/data/siteMetadata";
import dynamic from "next/dynamic";
import { PostFrontMatter } from "@/lib/types";

interface Props {
  frontMatter: PostFrontMatter;
}

const GiscusComponent = dynamic(
  () => {
    return import("@/components/comments/Giscus");
  },
  { ssr: false },
);

const Comments = ({ frontMatter }: Props) => {
  let term;
  switch (
    siteMetadata.comment.giscusConfig.mapping ||
    siteMetadata.comment.utterancesConfig.issueTerm
  ) {
    case "pathname":
      term = frontMatter.slug;
      break;
    case "url":
      term = window.location.href;
      break;
    case "title":
      term = frontMatter.title;
      break;
  }
  return (
    <div id="comment">
      {siteMetadata.comment && siteMetadata.comment.provider === "giscus" && (
        <GiscusComponent mapping={term} />
      )}
    </div>
  );
};

export default Comments;