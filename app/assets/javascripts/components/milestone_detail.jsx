class MilestoneDetail extends React.Component {
  render() {
    return (
      <div className='post-detail'>
        <div className='post-detail-header milestone-detail'>
          <div className='post-detail-header-main'>
            <div className='post-detail-name post-detail-name-reduce'>{this.props.title}</div>
            <div className='post-detail-header-action'>
              <div className='post-detail-upvote'>
                <Upvote {...this.props} />
              </div>

              <div className='post-detail-author'>
                <a href={Routes.profile_path(this.props.user.github_nickname)}>
                  <div>
                    <img src={this.props.user.thumbnail} />
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
        <PostDetailBody {...this.props} />
        <PostDetailFooter {...this.props} />
      </div>

    )
  }
}
