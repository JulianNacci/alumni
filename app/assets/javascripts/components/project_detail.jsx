class ProjectDetail extends React.Component {
  render() {
    var upVoters = this.props.up_voters;
    var connectedUsersWhoUpvoted = _.sum(upVoters, (upVoter) => upVoter.connected_to_slack ? 1 : 0);
    var sortedUpVoters = _.sortByAll(
      this.props.upVoters,
      (upVoter) => upVoter.connected_to_slack ? 0 : 1,
      (upVoter) => upVoter.github_nickname.toLowerCase()
    );

    return(
      <div className='post-detail'>
        <div className='post-detail-header resource-detail'>
          <div className='post-detail-header-main'>
            <div className='project-detail-batch'>
              {this.props.batch.name} - {this.props.batch.city}
            </div>
            <a href={this.props.url} >
              <div className='post-detail-name'>{this.props.name}</div>
            </a>
            <div className='post-detail-tagline'>{this.props.tagline}</div>
            <div className='post-detail-header-action'>
              <a href={this.props.url} target='_blank'>
                <div className='post-detail-url'>
                  {this.props.url}
                </div>
              </a>
              <div className='project-detail-makers post-detail-author'>
                {this.props.makers.map(
                  (maker) => {return(
                    <a href={Routes.profile_path(maker.github_nickname)}>
                      <div>
                        <img src={maker.gravatar_url} className='' />
                      </div>
                    </a>
                  )}
                )}
              </div>
            </div>
          </div>
        </div>
        <div className='container'>
          {this.props.milestones.map(
            (milestone) => {return (
              <div className='milestone-item-container'>
                <div className='milestone-item-date'>
                  {milestone.date}
                </div>
                <MilestoneListElement {...milestone} />
              </div>
            )}
          )}
        </div>
      </div>
    )
  }
}
