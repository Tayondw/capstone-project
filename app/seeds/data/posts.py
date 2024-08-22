from random import sample, randint
from seeds.users import users


posts = [
    {
        "creator": 1,
        "title": "What is anger?",
        "caption": "The opposite of Ted Lasso",
        "image": "https://mencrytoo.s3.amazonaws.com/tags/anger1.jpg",
        "post_likes": list(
            set(sample([user.id for user in users], randint(0, len(users))))
        ),  # to ensure unique users
    },
    {
        "creator": 1,
        "title": "How to manage anger?",
        "caption": "Bernie Mac movies or just watch anger management w/ Adam Sandler",
        "image": "https://mencrytoo.s3.amazonaws.com/tags/anger2.jpg",
        "post_likes": list(
            set(sample([user.id for user in users], randint(0, len(users))))
        ),  # to ensure unique users
    },
    {
        "creator": 1,
        "title": "When to control your anger?",
        "caption": "Where is your scooter!? Where is it!?",
        "image": "https://mencrytoo.s3.amazonaws.com/tags/anger3.jpg",
        "post_likes": list(
            set(sample([user.id for user in users], randint(0, len(users))))
        ),  # to ensure unique users
    },
    {
        "creator": 2,
        "title": "How do i know if you suffer from anxiety?",
        "caption": "I feel like I'm the mother from The Glass Menagerie",
        "image": "https://mencrytoo.s3.amazonaws.com/tags/anxiety1.jpg",
        "post_likes": list(
            set(sample([user.id for user in users], randint(0, len(users))))
        ),  # to ensure unique users
    },
    {
        "creator": 2,
        "title": "Where you can find help for anxiety?",
        "caption": "Joggers, spring/ summer",
        "image": "https://mencrytoo.s3.amazonaws.com/tags/anxiety2.jpg",
        "post_likes": list(
            set(sample([user.id for user in users], randint(0, len(users))))
        ),  # to ensure unique users
    },
    {
        "creator": 2,
        "title": "When to find help for anxiety?",
        "caption": "Seeder",
        "image": "https://mencrytoo.s3.amazonaws.com/tags/anxiety3.jpg",
        "post_likes": list(
            set(sample([user.id for user in users], randint(0, len(users))))
        ),  # to ensure unique users
    },
    {
        "creator": 3,
        "title": "Stick it to the man!",
        "caption": "Section 80, Hiii Power",
        "image": "https://mencrytoo.s3.amazonaws.com/tags/depression1.jpg",
        "post_likes": list(
            set(sample([user.id for user in users], randint(0, len(users))))
        ),  # to ensure unique users
    },
    {
        "creator": 3,
        "title": "Down with Power",
        "caption": "One is the loneliest number",
        "image": "https://mencrytoo.s3.amazonaws.com/tags/depression2.jpg",
        "post_likes": list(
            set(sample([user.id for user in users], randint(0, len(users))))
        ),  # to ensure unique users
    },
    {
        "creator": 3,
        "title": "Everyone hates me",
        "caption": "I'm so lonely!",
        "image": "https://mencrytoo.s3.amazonaws.com/tags/depression3.jpg",
        "post_likes": list(
            set(sample([user.id for user in users], randint(0, len(users))))
        ),  # to ensure unique users
    },
    {
        "creator": 4,
        "title": "DRUGS!",
        "caption": "Squirdward needs this stuff",
        "image": "https://mencrytoo.s3.amazonaws.com/tags/abuse1.jpg",
        "post_likes": list(
            set(sample([user.id for user in users], randint(0, len(users))))
        ),  # to ensure unique users
    },
    {
        "creator": 4,
        "title": "MORE DRUGS!",
        "caption": "Well, this is what I get for building something with high functionality",
        "image": "https://mencrytoo.s3.amazonaws.com/tags/abuse2.jpg",
        "post_likes": list(
            set(sample([user.id for user in users], randint(0, len(users))))
        ),  # to ensure unique users
    },
    {
        "creator": 4,
        "title": "and more drugs!!!",
        "caption": "so many seeds",
        "image": "https://mencrytoo.s3.amazonaws.com/tags/abuse3.jpg",
        "post_likes": list(
            set(sample([user.id for user in users], randint(0, len(users))))
        ),  # to ensure unique users
    },
    {
        "creator": 5,
        "title": "Stressed out",
        "caption": "Type something",
        "image": "https://mencrytoo.s3.amazonaws.com/tags/stress1.jpg",
        "post_likes": list(
            set(sample([user.id for user in users], randint(0, len(users))))
        ),  # to ensure unique users
    },
    {
        "creator": 5,
        "title": "Super stressed?",
        "caption": "Here's something to help",
        "image": "https://mencrytoo.s3.amazonaws.com/tags/stress2.jpg",
        "post_likes": list(
            set(sample([user.id for user in users], randint(0, len(users))))
        ),  # to ensure unique users
    },
    {
        "creator": 5,
        "title": "I need it!",
        "caption": "I'm in love with drugs",
        "image": "https://mencrytoo.s3.amazonaws.com/tags/stress3.jpg",
        "post_likes": list(
            set(sample([user.id for user in users], randint(0, len(users))))
        ),  # to ensure unique users
    },
    {
        "creator": 6,
        "title": "Who Needs Friends?",
        "caption": "What's normal anyway?",
        "image": "https://mencrytoo.s3.amazonaws.com/tags/relationships3.jpeg",
        "post_likes": list(
            set(sample([user.id for user in users], randint(0, len(users))))
        ),  # to ensure unique users
    },
    {
        "creator": 6,
        "title": "I Can Do Bad All By Myself",
        "caption": "I don't need you!",
        "image": "https://mencrytoo.s3.amazonaws.com/tags/relationships2.jpeg",
        "post_likes": list(
            set(sample([user.id for user in users], randint(0, len(users))))
        ),  # to ensure unique users
    },
    {
        "creator": 6,
        "title": "The Diary of a Mad Black Man",
        "caption": "Charles did not have to do me like that",
        "image": "https://mencrytoo.s3.amazonaws.com/tags/relationships1.jpeg",
        "post_likes": list(
            set(sample([user.id for user in users], randint(0, len(users))))
        ),  # to ensure unique users
    },
    {
        "creator": 7,
        "title": "Pulp Fiction",
        "caption": "And I will strike down upon thee with great vengeance and furious anger those who attempt to poison and destroy my brothers and you will know my name is the Lord when I lay my vengeance upon thee",
        "image": "https://mencrytoo.s3.amazonaws.com/tags/trauma2.jpeg",
        "post_likes": list(
            set(sample([user.id for user in users], randint(0, len(users))))
        ),  # to ensure unique users
    },
    {
        "creator": 7,
        "title": "How to Get Away With Murder?",
        "caption": "Wig sweating, nose running",
        "image": "https://mencrytoo.s3.amazonaws.com/tags/trauma3.jpg",
        "post_likes": list(
            set(sample([user.id for user in users], randint(0, len(users))))
        ),  # to ensure unique users
    },
    {
        "creator": 7,
        "title": "Scandal",
        "caption": "Consider it handled.",
        "image": "https://mencrytoo.s3.amazonaws.com/tags/trauma.jpeg",
        "post_likes": list(
            set(sample([user.id for user in users], randint(0, len(users))))
        ),  # to ensure unique users
    },
    {
        "creator": 8,
        "title": "Brokeback Mountain",
        "caption": "Well, that's that!",
        "image": "https://mencrytoo.s3.amazonaws.com/tags/coming-out1.jpeg",
        "post_likes": list(
            set(sample([user.id for user in users], randint(0, len(users))))
        ),  # to ensure unique users
    },
    {
        "creator": 8,
        "title": "CUARTO LUNAS",
        "caption": "Aaaaand another",
        "image": "https://mencrytoo.s3.amazonaws.com/tags/coming-out2.jpeg",
        "post_likes": list(
            set(sample([user.id for user in users], randint(0, len(users))))
        ),  # to ensure unique users
    },
    {
        "creator": 8,
        "title": "Dennis Rodman",
        "caption": "Another post",
        "image": "https://mencrytoo.s3.amazonaws.com/tags/coming-out3.jpeg",
        "post_likes": list(
            set(sample([user.id for user in users], randint(0, len(users))))
        ),  # to ensure unique users
    },
    {
        "creator": 9,
        "title": "Mo Money Mo Problems",
        "caption": "Who's hot, who not?",
        "image": "https://mencrytoo.s3.amazonaws.com/tags/grief1.jpeg",
        "post_likes": list(
            set(sample([user.id for user in users], randint(0, len(users))))
        ),  # to ensure unique users
    },
    {
        "creator": 9,
        "title": "Life",
        "caption": "I'm the papi!",
        "image": "https://mencrytoo.s3.amazonaws.com/tags/grief2.jpeg",
        "post_likes": list(
            set(sample([user.id for user in users], randint(0, len(users))))
        ),  # to ensure unique users
    },
    {
        "creator": 9,
        "title": "Guess Who",
        "caption": "Hold up, wait a minute!",
        "image": "https://mencrytoo.s3.amazonaws.com/tags/grief3.jpeg",
        "post_likes": list(
            set(sample([user.id for user in users], randint(0, len(users))))
        ),  # to ensure unique users
    },
    {
        "creator": 10,
        "title": "Holes",
        "caption": "I'm tired of this grandpa!",
        "image": "https://mencrytoo.s3.amazonaws.com/tags/thoughts3.jpeg",
        "post_likes": list(
            set(sample([user.id for user in users], randint(0, len(users))))
        ),  # to ensure unique users
    },
    {
        "creator": 10,
        "title": "Survivor",
        "caption": "Oldie but goodie",
        "image": "https://mencrytoo.s3.amazonaws.com/tags/thoughts2.jpeg",
        "post_likes": list(
            set(sample([user.id for user in users], randint(0, len(users))))
        ),  # to ensure unique users
    },
    {
        "creator": 10,
        "title": "Idk this is the last of a bunch of seeders",
        "caption": "I feel that",
        "image": "https://mencrytoo.s3.amazonaws.com/tags/thoughts1.jpeg",
        "post_likes": list(
            set(sample([user.id for user in users], randint(0, len(users))))
        ),  # to ensure unique users
    },
]
