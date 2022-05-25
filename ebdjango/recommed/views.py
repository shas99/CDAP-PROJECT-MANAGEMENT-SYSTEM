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
import nltk

import pandas as pd
pd.set_option('display.max_colwidth', 500)
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
import pickle as pickle
from nltk.stem import WordNetLemmatizer
from nltk import FreqDist
from nltk.corpus import stopwords
# Instantiating the lemmatizer
lemmatizer = WordNetLemmatizer()



import pandas as pd
pd.set_option('display.max_colwidth', 500)
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
import pickle as pickle
from sklearn.feature_extraction.text import TfidfVectorizer, CountVectorizer
from sklearn.cluster import KMeans, AgglomerativeClustering
from sklearn.metrics import silhouette_score, davies_bouldin_score
from sklearn.preprocessing import MinMaxScaler

import sys

for path in sys.path:
    print(path)

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
    m = request.GET.get('color', '')
    print(m)
    cyber = request.GET.get('cyber', '')
    print(cyber)
    mobile = request.GET.get('mobile', '')
    print(mobile)
    ai = request.GET.get('ai', '')
    print(ai)
    desgining = request.GET.get('desgining', '')
    print(desgining)
    operatingSystem = request.GET.get('operatingSystem', '')
    print(operatingSystem)
    networking = request.GET.get('networking', '')
    print(networking)
    robotics = request.GET.get('robotics', '')
    print(robotics)
    print(type(cyber))
    biolist = m.split(",")
    cyberlist = cyber.split(",")
    mobilelist = mobile.split(",")
    ailist = ai.split(",")
    desgininglist = desgining.split(",")
    operatingSystemlist = operatingSystem.split(",")
    networkinglist = networking.split(",")
    roboticslist = robotics.split(",")
    print(biolist)
    print(cyberlist)
    print(mobilelist)
    print(ailist)
    print(desgininglist)
    print(operatingSystemlist)
    print(networkinglist)
    print(roboticslist)


    print("this")
    # testData = {'BIOS':m,
    #             'cyber':cyber[0]}
    testDF = pd.DataFrame(biolist, columns=['Bios'])
    # testDF = pd.DataFrame({'Bios':[m],'Cyber':[cyber],'Mobile':[mobile],'AI':[ai],'desgining':[desgining],'Operating System':[operatingSystem],'networking':[networking],'Robotics':[robotics]})
    
    
    
    print("##########################################")
    print(testDF)
    print("##########################################")

    qs = ['Cyber',
        'Mobile',
        'AI',
        'Designing',
        'OperatingSystem',
        'Robotics',
        'Networking']

    # Creating a DF of the questions/categories
    topic_df = pd.DataFrame(columns=qs)
    
    count = 0
    for i in cyberlist:
        # i = int(i)
        # print(type(i))
        # print(i)
        # topic_df.append({"Cyber":cyberlist[count]},ignore_index=True)
        print(cyberlist)
        topic_df = topic_df.append({"Cyber":cyberlist[count],"Mobile":mobilelist[count],"AI":ailist[count],"Designing":desgininglist[count],"OperatingSystem":operatingSystemlist[count],"Robotics":roboticslist[count],"Networking":networkinglist[count]},ignore_index=True)
        
        count = count +1
        print(count)
    final_df = testDF.join(topic_df)
    final_df
    print("fffffffff")
    print(final_df)
    print("fffffffff")
    # Loading the data
    # with open("profiles.pkl",'rb') as fp:
    #     df = pickle.load(fp)
    #     print("############")
    #     print(df)
    #     print("############")

    df = final_df.copy()
    
     # Tokenizing Function
    def tokenize(text):
        """
        Tokenizing the bios, then lemmatizing them
        """
        # Creating a library of stopwords
        stops = stopwords.words('english')
        
        # Lowercasing the words
        text = text.lower()
        
        # Removing the punctuations (periods)
        text = text.replace('.', '')
        
        # Splitting on spaces between words
        text = text.split(' ')
        
        # Lemmatizing the words and removing stop words
        text = [lemmatizer.lemmatize(i) for i in text if i not in stops]
        
        return text
        
    # Applying the function to each user bio
    df['Bios'] = df.Bios.apply(tokenize)   

    print(df['Bios'])


    # Creating a set list that will only take in unique words
    total_vocab = set()

    # Iterating through the bios for each word
    for bio in df['Bios']:
        total_vocab.update(bio)

    # Printing out the number of unique words in all the bios combined
    print("Number of unique words: ",len(total_vocab))

    # Determining the most frequent words in user bios
    words = []

    # Adding all the words in each bio to a list
    for bio in df['Bios']:
        words.extend(bio)

    # Determining the use frequency of each word in all the bios
    bio_freq = FreqDist(words)
    bio_freq.most_common(104)

    # Plotting the most frequently used words
    plt.style.use('ggplot')
    plt.figure(figsize=(15,5))

    plt.bar(*zip(*bio_freq.most_common(25)))
    plt.xticks(rotation=75)
    plt.title('Most Frequently Used Words in User Bios')
    plt.show()


    # Instantiating the score of each bigram
    bigram_meas = BigramAssocMeasures()

    # Finding and ranking the Bigrams in each bio
    bio_finder = BigramCollocationFinder.from_words(words)

    # Finding the frequency scores of each bigram 
    bio_scored = bio_finder.score_ngrams(bigram_meas.raw_freq)

    # Top 50 most common bigrams
    bio_scored[:50]

    # Creating a list of the bigrams
    bg = list(map(lambda x: x[0][0] + ' ' + x[0][1], bio_scored[:50]))

    # Creating a list of the frequency scores
    bio_scores = list(map(lambda x: x[1], bio_scored[:50]))

    # Combining both the scores and the bigrams
    bigrams = list(zip(bg, bio_scores))

    # Plotting the bigrams and their frequency scores
    plt.style.use('bmh')
    plt.figure(figsize=(15,5))

    plt.bar(*zip(*bigrams[:25]))
    plt.xticks(rotation=80)
    plt.title('Top 25 Most Common Bigrams')
    plt.show()# Instantiating the score of each bigram
    bigram_meas = BigramAssocMeasures()

    # Finding and ranking the Bigrams in each bio
    bio_finder = BigramCollocationFinder.from_words(words)

    # Finding the frequency scores of each bigram 
    bio_scored = bio_finder.score_ngrams(bigram_meas.raw_freq)

    # Top 50 most common bigrams
    bio_scored[:50]

    # Creating a list of the bigrams
    bg = list(map(lambda x: x[0][0] + ' ' + x[0][1], bio_scored[:50]))

    # Creating a list of the frequency scores
    bio_scores = list(map(lambda x: x[1], bio_scored[:50]))

    # Combining both the scores and the bigrams
    bigrams = list(zip(bg, bio_scores))

    # Plotting the bigrams and their frequency scores
    plt.style.use('bmh')
    plt.figure(figsize=(15,5))

    plt.bar(*zip(*bigrams[:25]))
    plt.xticks(rotation=80)
    plt.title('Top 25 Most Common Bigrams')
    plt.show()

        # Loading in the cleaned DF
    with open("profiles.pkl",'rb') as fp:
        df = pickle.load(fp)
        print("ooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo")
        df = final_df.copy()
        print(final_df)
        print(df)
    # Instantiating the Scaler
    scaler = MinMaxScaler()
    # Scaling the categories then replacing the old values
    df = df[['Bios']].join(
                pd.DataFrame(
            scaler.fit_transform(
                                df.drop('Bios',axis=1)), 
                                columns=df.columns[1:], 
                                index=df.index))
    print("testingtestingtesting")
    print(df)
    print("testingtestingtesting")
    # Instantiating the Vectorizer, experimenting with both
    vectorizer = CountVectorizer()
    #vectorizer = TfidfVectorizer()

    # Fitting the vectorizer to the Bios
    x = vectorizer.fit_transform(df['Bios'])

    # Creating a new DF that contains the vectorized words
    df_wrds = pd.DataFrame(x.toarray(), columns=vectorizer.get_feature_names_out())

    # Concating the words DF with the original DF
    new_df = pd.concat([df, df_wrds], axis=1)

    # Dropping the Bios because it is no longer needed in place of vectorization
    new_df.drop('Bios', axis=1, inplace=True)
    print("NNNNNNNNNNNNNNNNNNNNNNNEeeeeeeeeeeeeeeeeeeeeeeeeewwwwwwwwwwwwwwwwwwwwww")
    print(new_df)
    # Importing the library
    from sklearn.decomposition import PCA

    # Instantiating PCA
    pca = PCA()

    # Fitting and Transforming the DF
    df_pca = pca.fit_transform(new_df)

    # Plotting to determine how many features should the dataset be reduced to
    # plt.style.use("bmh")
    # plt.figure(figsize=(14,4))
    # plt.plot(range(1,new_df.shape[1]+1), pca.explained_variance_ratio_.cumsum())
    # plt.show()

    # Finding the exact number of features that explain at least 95% of the variance in the dataset
    total_explained_variance = pca.explained_variance_ratio_.cumsum()
    n_over_95 = len(total_explained_variance[total_explained_variance>=.95])
    n_to_reach_95 = new_df.shape[1] - n_over_95

    # Printing out the number of features needed to retain 95% variance
    print(f"Number features: {n_to_reach_95}\nTotal Variance Explained: {total_explained_variance[n_to_reach_95]}")

    # Reducing the dataset to the number of features determined before
    pca = PCA(n_components=n_to_reach_95)

    # Fitting and transforming the dataset to the stated number of features and creating a new DF
    df_pca = pca.fit_transform(new_df)

    # Seeing the variance ratio that still remains after the dataset has been reduced
    print(pca.explained_variance_ratio_.cumsum()[-1])

    # Setting the amount of clusters to test out
    cluster_cnt = [i for i in range(2, 20, 1)]

    # Establishing empty lists to store the scores for the evaluation metrics
    s_scores = []

    db_scores = []

    # Looping through different iterations for the number of clusters
    for i in cluster_cnt:
        
        # Hierarchical Agglomerative Clustering with different number of clusters
        hac = AgglomerativeClustering(n_clusters=i)
        
        hac.fit(df_pca)
        
        cluster_assignments = hac.labels_
        
        ## KMeans Clustering with different number of clusters
        #k_means = KMeans(n_clusters=i)
        
        #k_means.fit(df_pca)
        
        #cluster_assignments = k_means.predict(df_pca)
        
        # Appending the scores to the empty lists    
        s_scores.append(silhouette_score(df_pca, cluster_assignments))
        
        db_scores.append(davies_bouldin_score(df_pca, cluster_assignments))
        

    def plot_evaluation(y, x=cluster_cnt):
        """
        Plots the scores of a set evaluation metric. Prints out the max and min values of the evaluation scores.
        """
        
        # Creating a DataFrame for returning the max and min scores for each cluster
        df = pd.DataFrame(columns=['Cluster Score'], index=[i for i in range(2, len(y)+2)])
        df['Cluster Score'] = y
        
        print('Max Value:\nCluster #', df[df['Cluster Score']==df['Cluster Score'].max()])
        print('\nMin Value:\nCluster #', df[df['Cluster Score']==df['Cluster Score'].min()])
        
        # Plotting out the scores based on cluster count
        plt.figure(figsize=(16,6))
        plt.style.use('ggplot')
        plt.plot(x,y)
        plt.xlabel('# of Clusters')
        plt.ylabel('Score')
        plt.show()
        
    # Running the function on the list of scores
    plot_evaluation(s_scores)

    plot_evaluation(db_scores)        

    # Instantiating HAC
    hac = AgglomerativeClustering(n_clusters=12)

    # Fitting
    hac.fit(df_pca)

    # Getting cluster assignments
    cluster_assignments = hac.labels_

    # Unscaling the categories then replacing the scaled values
    df = df[['Bios']].join(pd.DataFrame(scaler.inverse_transform(df.drop('Bios', axis=1)), columns=df.columns[1:], index=df.index))

    # Assigning the clusters to each profile
    df['Cluster #'] = cluster_assignments

    # Viewing the dating profiles with cluster assignments
    df 




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