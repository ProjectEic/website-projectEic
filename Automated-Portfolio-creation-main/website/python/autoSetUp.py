import json


class website:
    def __init__(self, title, aboutText, aboutFoto, email, phoneNumber, mainColor, secondaryColor, accentColor, backgroundColor, metaDescription) -> None:
        self.title = title
        self.email = email
        self.phoneNumber = phoneNumber
        self.aboutText = aboutText
        self.aboutFoto = aboutFoto
        self.mainColor = mainColor
        self.secondaryColor = secondaryColor
        self.accentColor = accentColor
        self.backgroundColor = backgroundColor
        self.metaDescription = metaDescription


class project: 
    def __init__(self, title, text, foto) -> None:
        self.title = title
        self.text = text
        self.foto = foto
        
        # for arg in args:
        #     self.arr.append[arg]
        
class services: 
    def __init__(self, title, text, fotoUrl) -> None:
        self.title = title
        self.text = text
        self.fotoUrl = fotoUrl
        
class clients: 
    def __init__(self, name, foto) -> None:
        self.name = name
        self.foto = foto

            
# class contact:  
#     def __init__(self, facebook, linkedin, pinterest, twitter, whatsapp, youtube, instagramm, github) -> None:
#         self.facebook = facebook
#         self.linkedin = linkedin
#         self.pinterest = pinterest
#         self.twitter = twitter

#         self.whatsapp = whatsapp
#         self.youtube = youtube
#         self.instagramm = instagramm
#         self.github = github
            

# Greeting
# Display a title bar.
print("**************************************************")
print("***  Application to automate Portfoliowebsites ***")
print("**************************************************")


print("\n\n")

title = input('\nEnter the title\n') 

aboutText = input('\nEnter the about text\n')

aboutFoto= input('\nEnter the about foto\n')

email = input('\nEnter the your email\n')

phoneNumber = input('\nEnter the number of your phone\n')

mainColor = input('\nEnter the main color\n')

secondaryColor = input('\nEnter the secondary color\n')

accentColor = input('\nEnter the accent color\n')

backgroundColor = input('\nEnter the background color\n')

metaDescription= input('\nEnter the meta description\n')




protoWebsite = website(title, aboutText, aboutFoto, email, phoneNumber, mainColor, secondaryColor, accentColor, backgroundColor, metaDescription)

print("\n\n")
print("**************** Add Projects to your Website ****************\n")


projectArr = {}
servicesArr = {}
clientsArr = {}


def testForN(bool, name):
    if (bool != "Y" and bool != "y"):
        bool = input("Press Y to add " +  str(name) + "\n\n")
    elif(bool == "N" or bool == "n"):
        bool = "N"
    elif(bool == "Y" or bool == "y"):
        bool = "Y"
    else:
        testForN(bool, name)         



bool = "Y"
i = 0
while(bool == "Y" or bool == "y"):
    _project = input("Add a title for your project\n")
    _projectText = input("Add a text for your project\n")
    _fotoUrl = input("Add a photoURL for your project\n")
    listItemProject = project(_project, _projectText, _fotoUrl)
    projectArr[i] = listItemProject
    i += 1
    bool = input("Press Y to add Projects\n\n")
    testForN(bool, "Projects")
 
print("\n\n")    
    
bool = "Y"
i = 0
while(bool == "Y" or bool == "y"):
    _service = input("Add a title for your service\n")
    _serviceText = input("Add a text for your service\n")
    _serviceFotourl = input("Add a Fotourl for your service\n")
    listItemService = services(_service, _serviceText, _serviceFotourl)
    servicesArr[i] = listItemService
    i += 1
    bool = input("Press Y to add Services\n\n")
    testForN(bool, "Services") 

print("\n\n")


bool = input("Press Y to add a client\n\n")
i = 0
while(bool == "Y" or bool == "y"):
    _client= input("Add the name for your client\n")
    _clientFoto = input("Add a photoURL for your client\n")
    listItemClient = clients(_client, _clientFoto)
    clientsArr[i] = listItemClient
    i += 1
    bool = input("Press Y to add a client\n\n")
    testForN(bool, "Services")


socialMediaDict = dict()


    
_boolFacebook = input("Press Y to add facebook to your social media\n")
if(_boolFacebook  != "N" and _boolFacebook != "n"):
    _linkFacebook =  input("Enter the link for your social media\n")
    socialMediaDict['facebook'] = _linkFacebook
    
_boollinkedin = input("Press Y to add linkedin to your social media\n")
if(_boollinkedin != "N" and _boollinkedin != "n"):
    _linklinkedin =  input("Enter the link for your social media\n")
    socialMediaDict['linkedin'] = _linklinkedin

_boolpinterest = input("Press Y to add pinterest to your social media\n")
if(_boolpinterest  != "N" and _boolpinterest != "n"):
    _linkpinterest =  input("Enter the link for your social media\n")
    socialMediaDict['pinterest'] = _linkpinterest
    
_booltwitter = input("Press Y to add twitter to your social media\n")
if(_booltwitter != "N" and _booltwitter != "n"):
    _linktwitter =  input("Enter the link for your social media\n")
    socialMediaDict['twitter'] = _linktwitter
    
boolyoutube= input("Press Y to add youtube to your social media\n")
if(boolyoutube  != "N" and boolyoutube != "n"):
    _linkyoutube =  input("Enter the link for your social media\n")
    socialMediaDict['youtube'] = _linkyoutube
    
boolinstagramm= input("Press Y to add instagramm to your social media\n")
if(boolinstagramm  != "N" and boolinstagramm != "n"):
    _linkinstagramm =  input("Enter the link for your social media\n")
    socialMediaDict['instagramm'] = _linkinstagramm
    
boolgithub = input("Press Y to add github to your social media\n")
if(boolgithub != "N" and boolgithub != "n"):
    print
    _linkgithub =  input("Enter the link for your social media\n")
    socialMediaDict['github'] = _linkgithub

   
with open("data.json", "w", encoding='utf-8') as dataJson:
    json.dump([protoWebsite, projectArr, servicesArr, clientsArr, socialMediaDict], dataJson, default=lambda o: o.__dict__, indent=4, ensure_ascii=False)




   
print("finished")