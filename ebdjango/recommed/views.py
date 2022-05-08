from django.shortcuts import render
from django.http import HttpResponse

from django.http import JsonResponse
import json

## Importing Libraries
import requests
import pandas as pd
import time
import random
import re
import numpy as np
import pickle as pickle
from tqdm.notebook import tqdm as tqdm
from bs4 import BeautifulSoup as bs
from IPython.display import display


# Importing the libraries
import pandas as pd
pd.set_option('display.max_colwidth', 500)
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
import pickle as pickle
from nltk.stem import WordNetLemmatizer
from nltk import FreqDist
from nltk.corpus import stopwords
from nltk.collocations import BigramAssocMeasures, BigramCollocationFinder


def sayHello(request):
    # ## Using BeautifulSoup

    # # Randomizing the refresh rate
    # seq = [i/10 for i in range(8,18)]

    # # Creating a list of bios
    # biolist = []

    # # Gathering bios by looping and refreshing the web page
    # for _ in tqdm(range(1)):
        
    #     # Refreshing the page
    #     page = requests.get("https://www.fakepersongenerator.com/user-biography-generator?new=refresh")
    #     soup = bs(page.content,features="html.parser")
        
    #     try:
    #         # Getting the bios
    #         bios = soup.find('div', class_='row no-margin for-sign').find_all('p')

    #         # Adding to a list of the bios
    #         biolist.extend([re.findall('"([^"]*)"', i.text) for i in bios])
    #     except:
    #         pass
        
    #     # Sleeping 
    #     time.sleep(random.choice(seq))
        
    # # Creating a DF from the bio list
    # bio_df = pd.DataFrame(biolist, columns=['Bios'])

    # # List of potential Dating questions/categories
    # qs = ['Cyber',
    #     'Mobile',
    #     'AI',
    #     'Designing',
    #     'Operating system',
    #     'Robotics',
    #     'Networking']

    # # Creating a DF of the questions/categories
    # topic_df = pd.DataFrame(columns=qs)

    # # Filling in Data
    # for i in topic_df.columns:
        
    #     # Range of numbers to represent different labels in each category
    #     topic_df[i] = np.random.randint(0,10, bio_df.shape[0])
        
    #     # Logic: The numbers represent a specific choice within the categories
    #     # So your number 1 preferred artist/song/album under the Music, your one favorite movie, etc.
        
    # # Joining the two dataframes
    # final_df = bio_df.join(topic_df)
    # final_df

    # # Exporting the complete DF
    # with open("profiles.pkl", "wb") as fp:
    #     pickle.dump(final_df, fp)

    # display(bio_df.head(5))
    # display(bio_df.iloc[3])
    # print(bio_df.Bios[5])
    # print(final_df)



    # Loading the data
    with open("profiles.pkl",'rb') as fp:
        df = pickle.load(fp)


        




    x = "Hello "+str(2+2+2)
    g = request.GET.get('color', '')
    print(g)
    # y = json.loads(request.body.decode("utf-8"))
    # print(y['x'])

    df = df.to_json()

    responseData = {
        'Group Leader': "Chathushka Rodrigo",
        'Members': ["Shasvathan, Chamath, Buddhisha, Adhikari"],
        'Projects' : ['CDAP project managment system'],
        'Your message': "Your favourite color is " + g,
        'test': df
    }
    return JsonResponse(responseData)






# def sayHello(request):
#     return HttpResponse('Hello World')
# # Create your views here.