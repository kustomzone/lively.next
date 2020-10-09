# lively.next

This is the repository of the [lively.next project](https://lively-next.org).

## Requirements

*Please note* Currently the Lively server runs best on MacOS, Linux or the Windows Linux subsystem. Getting it going on pure Windows is possible but will require additional tweaks.

Make sure you have the following software installed.

1. node.js version 8 or later.
2. git

## Installation and Setup

1. Clone this repository and run the `install.sh` script. This will install the necessary dependencies and sync the Lively Partsbin with lively-next.org. Please note that this process will take a few minutes.
2. Run the `start.sh` script.
3. Lively will now be running on your local computer at [http://localhost:9011](http://localhost:9011).

## Docker Image
A docker image exists for this to try it out in the environment of your choice.
1. Run the docker command as follows: `docker run -d --restart=unless-stopped --name lively-next -p 9011:9011 engagelively/lively-next:alpha3`
2. Once completely started, navigate to [http://localhost:9011 ](http://localhost:9011)

## License

This project is [MIT licensed](LICENSE).
