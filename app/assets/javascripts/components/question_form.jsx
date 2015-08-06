class QuestionForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      preview: false,
      renderedContent: "Nothing to preview."
    }
  }

  render() {
    if (this.props.question_errors){
      if (this.props.question_errors.title != undefined) {var errorTitle = this.props.question_errors.title}
      if (this.props.question_errors.content != undefined) {var errorContent = this.props.question_errors.content}
    }
    var writeClasses = classNames({
      'answer-form-action': true,
      'is-active': !this.state.preview
    })
    var previewClasses = classNames({
      'answer-form-action': true,
      'is-active': this.state.preview
    })

    var contentInputClasses = classNames({
      'question-form-input': true,
      'is-previewed': this.state.preview
    })
    return(
      <form action={Routes.questions_path()} method='post'>
        <div className='container'>
          <div className='post-submissions-row'>
            <label htmlFor='title' className='hidden-xs'>
              <i className='mdi mdi-format-text'></i>Title
            </label>
            <input ref='title' defaultValue={this.props.question.title} placeholder="What's your question ? Be specific" name='title' />
            <div className='errors'>
              {errorTitle}
            </div>
          </div>
          <div className='post-submissions-row'>
            <label htmlFor='tagline' className='hidden-xs'>
              <i className='mdi mdi-message-text-outline'></i>Content
            </label>
            <div className={contentInputClasses}>
              <div className='answer-form-actions question-form-actions'>
                <a className={writeClasses} onClick={this.onWriteClick.bind(this)}>Write</a>
                <hr />
                <a className={previewClasses} onClick={this.onPreviewClick.bind(this)}>Preview</a>
                <a className="question-form-action-extra hidden-xs answer-form-action-extra" href="https://guides.github.com/features/mastering-markdown/" target="_blank">
                  <span className="octicon octicon-markdown"></span>
                  Markdown supported
                </a>
              </div>
              <textarea ref='content' defaultValue={this.props.question.tagline} placeholder='Describe your problem' name='content' />
              <div className='question-form-preview' dangerouslySetInnerHTML={{__html: this.state.renderedContent}} />
            </div>
            <div className='errors'>
              {errorContent}
            </div>
          </div>
        </div>
        <div className='post-submissions-submit'>
          <input type='submit' className='button button-success' value='Post it' />
        </div>
      </form>
    )
  }

  componentDidMount() {
    AnswerStore.listen(this.onStoreChange.bind(this));
  }

  componentWillUnmount() {
    AnswerStore.unlisten(this.onStoreChange.bind(this));
  }

  onStoreChange(store) {
    if (this.state.preview) {
      console.log(store)
      this.setState({
        renderedContent: store.new_answer.rendered_content == "" ? "Nothing to preview." : store.new_answer.rendered_content
      })
    }
  }

  onWriteClick(e) {
    e.preventDefault();
    this.setState({
      preview: false
    })
  }

  onPreviewClick(e) {
    e.preventDefault();
    this.setState({
      preview: true
    })
    if (!this.state.blank) {
      AnswerActions.preview(this.content().value);
    }
  }

  content() {
    return React.findDOMNode(this.refs.content);
  }
}
