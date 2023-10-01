# Team Collaboration API Documentation

## Introduction

The Team Collaboration API allows users to create teams, invite members, create and edit content collaboratively.

## Start the server

Run the following command in your terminal

`npm run start`

You should see the following message:
`Server is running on port 3000
MongoDB connected
`

## Endpoints

### Registration

Endpoint

`http://localhost:3000/api/auth/register`

Request body

```
{
  "username": "admin",
  "email": "admin@example.com",
  "password": "password",
  "role": "admin"
}
```

`POST /api/auth/login`

Request body

```
{
  "email": "admin@example.com",
  "password": "password"
}
```

Response

```
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsIn...",
}
```

### Create Team

Protected Endpoint (requires auth)

`POST /api/team/create`

Request Body

```
{
  "name": "Development Team",
  "members": ["65187311626effa8c375f7a0", "65187336626effa8c375f7a4"]
}
```

Response

```
{
    "message": "Team created successfully",
    "team": {
        "name": "Development Team",
        "members": [
            "65187311626effa8c375f7a0",
            "65187336626effa8c375f7a4"
        ],
        "_id": "65190954ceade2285f25d32b",
        "__v": 0
    }
}
```

### Send Invitation to join a team

Protected Endpoint (requires auth)

`POST /api/team/invite`

Request Body

```
{
  "teamId": "65190954ceade2285f25d32b",
  "userId": "651727911142a3e1bd4f2873",
  "senderId": "65187311626effa8c375f7a0"
}
```

Response

```
{
    "message": "Invitation sent successfully"
}
```

### Accept Invitation to join a team

Protected Endpoint (requires auth)

`POST /api/team/accept`

Request Body

```
{
  "invitationId": "651943adab15e56924f1f4d8",
  "userId": "65194297ab15e56924f1f4ca"
}
```

Response

```
{
    "message": "Invitation accepted and user added to team successfully",
    "team": {
        "_id": "651942c4ab15e56924f1f4cc",
        "name": "Development Team",
        "members": [
            "65194277ab15e56924f1f4c6",
            "65187336626effa8c375f7a4",
            "65194297ab15e56924f1f4ca"
        ],
        "__v": 1
    },
    "user": {
        "_id": "65194297ab15e56924f1f4ca",
        "username": "user-2",
        "email": "user2@example.com",
        "password": "$2a$10$YxekoOIMttBG0IuEmzB28eb9VTl.iQSzI4JbnOFDgI468mgakO2eq",
        "role": "member",
        "teams": [
            "651942c4ab15e56924f1f4cc"
        ],
        "__v": 1
    }
}
```

### Create Content

Protected Endpoint (requires auth)

`POST /api/content/create`

Request body

```
{
  "title": "Sample Content",
  "body": "Lorem ipsum dolor sit amet...",
  "teamId": "6519065bfa704fd0e0cc9626"
}
```

Response

```
{
    "message": "Content created successfully"
}
```

### Update Content

Protected Endpoint (requires auth)

`PUT /api/content/update/CONTENT_ID`

Request body

```
{
  "title": "Updated Sample Content",
  "body": "This is the updated sample content."
}
```

Response

```
{
    "message": "Content updated successfully",
    "content": {
        "_id": "651942ffab15e56924f1f4cf",
        "title": "Updated Sample Content",
        "body": "This is the updated sample content.",
        "team": "651942c4ab15e56924f1f4cc",
        "__v": 0
    }
}
```

## Testing in Postman

Collection: [Run in POSTMAN](https://god.gw.postman.com/run-collection/15016961-0cc60333-765a-406f-af65-3c504abc310c?action=collection%2Ffork&source=rip_markdown&collection-url=entityId%3D15016961-0cc60333-765a-406f-af65-3c504abc310c%26entityType%3Dcollection%26workspaceId%3D5d4d9f3c-1cff-4709-beb2-f4eb202bbfea)
