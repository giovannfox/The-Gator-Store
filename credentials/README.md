# Credentials Folder

## The purpose of this folder is to store all credentials needed to log into your server and databases. This is important for many reasons. But the two most important reasons is
    1. Grading , servers and databases will be logged into to check code and functionality of application. Not changes will be unless directed and coordinated with the team.
    2. Help. If a class TA or class CTO needs to help a team with an issue, this folder will help facilitate this giving the TA or CTO all needed info AND instructions for logging into your team's server. 


# Below is a list of items required. Missing items will causes points to be deducted from multiple milestone submissions.

1. Server URL or IP IP - 35.163.149.5 URL - ec2-35-163-149-5.us-west-2.compute.amazonaws.com
2. SSH username - ubuntu
3. SSH password or key.
    <br> If a ssh key is used please upload the key to the credentials folder.
4. Database URL or IP and port used.
    <br><strong> NOTE THIS DOES NOT MEAN YOUR DATABASE NEEDS A PUBLIC FACING PORT.</strong> But knowing the IP and port number will help with SSH tunneling into the database. The default port is more than sufficient for this class.
    host: "35.163.149.5",
    port: "3306",
    database: "dev",
5. Database username: dev
6. Database password: sYYRyoOuk0Et%3&
7. Database name (basically the name that contains all your tables): dev
8. Instructions on how to use the above information.
To connect to the server:
Open an SSH client.
Locate your private key file. The key used to launch this instance is team2.pem
Run this command, if necessary, to ensure your key is not publicly viewable.

 chmod 400 team2.pem
Connect to your instance using its Public DNS:

 ec2-35-163-149-5.us-west-2.compute.amazonaws.com
Example:

ssh -i "team2.pem" ubuntu@ec2-35-163-149-5.us-west-2.compute.amazonaws.com

# Most important things to Remember
## These values need to kept update to date throughout the semester. <br>
## <strong>Failure to do so will result it points be deducted from milestone submissions.</strong><br>
## You may store the most of the above in this README.md file. DO NOT Store the SSH key or any keys in this README.md file.
