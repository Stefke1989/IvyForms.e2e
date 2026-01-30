pipeline {
  agent any

  stages {

    stage('Install dependencies') {
      steps {
        sh 'npm install'
      }
    }

    // E2E testovi – AKTIVIRAĆE SE KAD BUDEMO SPREMNI
    // stage('E2E tests') {
    //   steps {
    //     sh 'rm -f storageState.json'
    //     sh 'npm run test:e2e'
    //   }
    // }

  }

  // Napomena:
  // U CI okruženju (Jenkins):
  // - storageState.json se NE commituje
  // - pre testova se UVEK generiše novi login
  // - po potrebi, storageState.json se može obrisati:
  //
  // sh 'rm -f storageState.json'
  // git rm --cached storageState.json
  // u .gitignore dodati storageState.json

//   Koraci:
//   git rm --cached storageState.json --- ukloni iz git praćenja
//   storageState.json dodaj u .gitignore
//   skloni komentare iz Jenkinsfile-a
//   pokreni:
//   git add .gitignore Jenkinsfile
//  git commit -m "Enable E2E tests in Jenkins"
//  git push

}
