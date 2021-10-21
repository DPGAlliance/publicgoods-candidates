## Documentation Best Practices

The presence of documentation helps keep track of all aspects of the digital public good and it improves on the quality of a digital solution. For software, the main focuses are development, maintenance and knowledge transfer to other developers:

## Software

* **Overview / Business Goal**: Provides a high-level overview of your product offering. Includes a description of how the system works detailing the expected inputs and outputs. Describes the value added by the product and the target user audience.
* **Architectural diagrams**: Complements the previous section by breaking down your product and architecture into functional components, describing each of them and how they interact/depend with one another. Includes a graphical diagram that is easy to understand for both technical and non-technical audiences. Distinguishes open source components (which include public git repository links, e.g. GitHub, GitLab, and/or Pagure) from proprietary ones (if any).
* **Technology stack / Platform**: Describes the various technologies used in your product, emphasizing mandatory dependencies, and specific versions that are known to be compatible, as well as those known to be incompatible. This is typically included in `package.json` for NodeJS projects or `requirements.txt` for Python projects, which should be updated any time a new version is released. Also highlights any part of the technology stack that is proprietary (if any). 
* **Installation guide**: Provides the necessary technical documentation that would allow a technical person unfamiliar with the project to launch and run your product. Think of the guide that a system administrator would refer to deploy your product in a local development environment as well as in a production environment.  
* **User guide**: Provides end-users all the necessary information to use your product. May include a FAQ section with the most common questions that you have collected from your existing users, or that you anticipate from your users. 
* **Source code reference**: Typically programmatically generated from docstrings included in the source code preceding each function. It is always recommended to include an introductory section that describes how the code is structured at a high-level to ease the process of a potential contributor to navigate your codebase.
* **API reference**: Typically programmatically generated from docstrings in the specific API functions, and publicly available so that other developers that want to integrate with your product offering can do so without having to delve into the source code. Should include an introductory section on how any API call should be made (e.g., authorization, throttling, authenticated endpoints, etc)
* **Release notes**: Follows [semantic versioning](https://semver.org/) (SemVer), and includes a [changelog](https://keepachangelog.com/), keeping a curated, chronologically ordered list of notable changes for each version of a project. For reference, see the following examples from [Hugo static site generator](https://github.com/gohugoio/hugo/releases) and [Matterbridge](https://github.com/42wim/matterbridge/releases).
* **Contributing guide**: Provides guidelines to communicate how people should contribute and participate in your project. For reference see the following examples from [The Atom editor](https://github.com/atom/atom/blob/master/CONTRIBUTING.md), [Ruby on Rails](https://github.com/rails/rails/blob/master/CONTRIBUTING.md) or [Fedora Linux](https://fedoraproject.org/wiki/Join). 

## AI Models

Builds on the documentation requirements outlined above for software and expands with the following sections:

* **Technology Stack / Platform**: In addition to the content described in the [Software](#Software) section, and specifically for AI, describes the platform the AI products are launched on, and provides technical requirements. For some activities, the product must have an exact type of GPU. For other activities, it must have significant computing power. Hence, not all platforms can provide this. _For example the art classifier app should be run on the latest iPhones and Android smartphones and tablets. It should make a classification in 3 seconds or faster._

* **Data**: Describes the following: 
  * All types of data and formats with which the project should work with; for neural networks may include model architectures such as convolution neural networks (CNN), recurrent neural networks (RNN), etc.
  * How to separate training and test datasets
  * Learning parameters which require tuning such as bias and slope in linear regression algorithms etc.
  * Learn a new dataset. Provides information required to apply transfer learning to adapt the model to a different use case through retraining the model.
  * Plot learning curves. Summarizes the loss and accuracy of the fitted model.
  * How to save or persist the model weights and model architecture such as in JSON or YAML.

* **Evaluation & Testing**: Defines how the results of the project will be tested and evaluated for example which metric is used: RMS, binary cross entropy, categorical cross entropy etc.

* **Integration guide**: Documents how your product offering integrates with any other relevant existing software (e.g., LMIS in the case of personalized learning), and provides generic guidance on how to integrate it with other systems.
