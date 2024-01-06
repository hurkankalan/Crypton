# CRYPTON

Crypton is an application which offers a functionality using artificial intelligence (AI) to predict the price of bitcoin and which provides information on the news, price and amount of cryptocurrencies with the possibility of purchasing them (React.js, Node.js, Python, PostgreSQL)

<img src="/front/src/assets/crypton.png" alt="Crypton logo" style="height: 100px; width:100px;"/>

## Start the project with Docker Compose

Use [Docker compose](https://docs.docker.com/compose/) to start the project.

```bash
# Create .env file in api folder and current path folder (view.env.example file)
touch .env
cd api
touch .env

# Build
docker compose build

# Start all services
docker compose up

# Stop all services
docker compose down
```

## FEATURES

Three levels of access are managed with specific privileges:

**Anonymous access**

- have access to the N (defined by an admin) most popular cryptocurrency courses as
well as their evolution (trend and percentage) since the opening

- can check the latest K (defined by an admin) articles in the press.

**User access**
- must first create an account
- user can authenticate by email and password
- user can authenticate by Oauth2
- can determine their own list (established by an admin, same list as anonymous user
by default) of cryptocurrencies
- can define keywords to refine the press review
- can change their preferences on their profile page

**Administrator access**
- manage global application preferences
- list of cryptocurrencies that can be consulted
- list of sources (RSS feed) to constitute the press review

## ROUTES API

**Users management**
- POST /users/register : the user MUST NOT be logged on. Register a user by sending a form.
- POST /users/login :
the user MUST NOT be logged on. Simple authentication by username/password, if successful, a session is started.
- GET /users/auth/discord : the user MUST NOT be logged on. Oauth2 authentication with Discord.
- POST /users/logout : the user MUST be logged on. The user disconnects, so you must end your session.
- GET /users/profile : the user MUST be logged on. Retrieving profile information.
- PUT /users/profile : the user MUST be logged on. Update profile information.

**Crypto-currencies**
- GET /cryptos?id : the user MAY be logged in OR NOT. Get the list of crypto-currencies and their info, which is at least : full name of the cryptocurrency, current price, opening price, lowest price of the day, highest price of the day, URL of the corresponding image of the cryptocurrency.
- GET /cryptos/{cmid}/history/{period} (mid: cryptocurrency Id. period: daily, hourly or minute) : the user MUST be logged in. Provides the price history of a cryptocurrency. For each period: opening, highest, lowest and closing exchange rates, daily: Last 60 days, so 60 periods a day, hourly: 48 last hours, so 48 periods of one hour, minute: last 2 hours, so 60 periods of one minute.
- POST /cryptos : the user MUST be logged in as well as the ADMINISTRATOR. Add a cryptocurrency to your platform. A form must be attached to the request and contain at least the cryptocurrency code, their full name and a URL for the image to which it represents.
- DELETE /cryptos/{cmid} : the user MUST be logged in as well as the ADMINISTRATOR. Deletes
a cryptocurrency (meaning that your platform does not know this currency anymore).

**Press review**
- GET /articles[?params1=value1&...] params: free. The user MUST be logged in (OR NOT). If the user is anonymous the settings (if any) are ignored and the last published articles are returned. If the user is logged in the settings are used to return only the items most relevant to the user (a list of keywords might help you). You are free to define the parameters that you think will be useful depending on the
search options you offer to your users. Here for each article, you must provide at least: an id, a title, an URL of the article’s page, an URL of its image (if it exists).
- GET /articles/{id} : the user MUST be logged in (OR NOT). Returns information about an
article, which is at least: id, title, summary, source, date, URL of the article’s page, the URL of its image (if it exists).
