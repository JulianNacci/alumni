json.extract! user, *user_properties

json.connected_to_slack user.connected_to_slack
json.user_messages_slack_url user.user_messages_slack_url

if user.staff
  json.badge 'staff'
elsif user.teacher
  json.badge 'teacher'
elsif user.teacher_assistant
  json.badge 'teacher assistant'
else
  json.badge 'alumni'
end

if user.batch
  json.batch do
    json.id user.batch.id
    json.slug user.batch.slug
    json.city user.batch.city.name
  end
end

json.votes do
  json.array! user.votes.each do |vote|
    post = vote.votable_type.constantize.find(vote.votable_id)
    json.partial! "posts/post", post: post
  end
end

json.posts do
  posts = user.resources + user.questions + user.jobs
  json.array! posts.each do |post|
    json.partial! "posts/post", post: post
  end
end

json.posts_answered do
  posts = user.resources + user.questions + user.jobs
  json.array! posts.each do |post|
    json.partial! "posts/post", post: post
  end
end
