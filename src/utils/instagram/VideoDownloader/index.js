function generateData(data = [], setState) {
  let videoArray = [];
  if (data.graphql.shortcode_media.video_url) {
    videoArray.push({
      src: data.graphql.shortcode_media.video_url,
      isVideo: true
    });
  } else if (data.graphql.shortcode_media.edge_sidecar_to_children) {
    data.graphql.shortcode_media.edge_sidecar_to_children.edges.map(
      (value, index) => {
        value.node.is_video
          ? videoArray.push({
              src: value.node.video_url,
              isVideo: true
            })
          : videoArray.push({
              src:
                value.node.display_resources[
                  value.node.display_resources.length - 1
                ].src,
              isVideo: false
            });
        return "";
      }
    );
  } else {
    videoArray.push({
      src:
        data.graphql.shortcode_media.display_resources[
          [data.graphql.shortcode_media.display_resources.length - 1]
        ].src,
      isVideo: false
    });
  }
  setState(videoArray);
}

export { generateData };
