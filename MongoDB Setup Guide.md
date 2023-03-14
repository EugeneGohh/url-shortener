
## Setting up a MongoDB Cluster

1. Sign up for a MongoDB Atlas account at https://www.mongodb.com/cloud/atlas.
2. Create a new project by clicking the "**Create Project**" button.
3. Choose "**Shared Cluster**"
4. Select a cloud provider (**Amazon Web Services, AWS**) and region (**Singapore (ap-southeast-1)**).
5. Keep **Cluster Tier** & **Additional Settings** to default.
6. Choose a name for your project (**Cluster0** works too!)
7. Click the "**Create Cluster**" button to create the cluster.
8. Configure any network access, and security settings.
9. Create a username and password for the cluster.
10. Configure the network access to your current IP.
11. Click "**Finish & Close**" button.
12. A cluster has been created 🎉

## Creating a Database
1. Navigate to the "**Database**" tab in your MongoDB Atlas dashboard.
2. Click on "**Browse Collections**".
3. Click on "**Add my Own Data**".
4. Enter "**Database Name**" & "**Collection Name**". Please enter the following to the input field.
   | Database Name  | Collection Name |
   | ---------------|:--------------: |
   | test           | items           |          
5. Click on "**Create**" button to "**Create Database**".
6. Untick all checkboxes on **Additional Preferences**.

## Connecting to MongoDB
1. Navigate to the "**Clusters**" tab in your MongoDB Atlas dashboard.
2. Click the "**Connect**" button for the cluster you want to connect to.
3. Choose a connection method, such as using a MongoDB driver or connecting from the command line.
4. In our case, choose the second option "**Connect your application**"
4. Follow the instructions provided by MongoDB Atlas to connect to your cluster using your chosen method.
5. Continue with the [**step 6**](./README.md#installation-guide).
