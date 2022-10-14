updateStatut(pageNumber: number) {
    if(!pageNumber)
        pageNumber = Number(this.pageStr);
    let startFrom = (pageNumber-1) * this.pagingSize;
    let endAt = startFrom + this.pagingSize;
    if(endAt > this.results.length)
        endAt = this.results.length;
    let pageRecords = this.results.slice(startFrom, endAt);
    console.log('start from ' + startFrom + ' end at ' + endAt);
    console.log(pageRecords);

    //call api
    // var param = this.buildRechercheParam();
    var param = this.buildLienCcbPcmMinStatutParam(pageRecords);
    console.log(param);
    this.service.lienCcbPcmMinStatut(param).subscribe( data => this.initPcmStatut(data, pageNumber), err => this.updateError( err ) );
    // this.service.lienCcbPcmMinStatut(param).subscribe( data => this.initRechercheResult(data), err => this.updateError( err ) );
}

const prm1 = new Promise((resolve, reject) => {
    updateStatut(1);
})

const prm2 = new Promise((resolve, reject) => {
    updateStatut(2);
})

const prm3 = new Promise((resolve, reject) => {
    updateStatut(3);
})

const runAllPormise = () => {
    Promise.all([prm1, prm2, prm3])
    .then(data => console.log(data))
    .catch(err => console.log(err))
}

runAllPormise();


private buildLienCcbPcmMinStatutParam(pageRecords) {
    var param = new LienCcbPcmMinStatutParam();
    // param.livre =
    param.livre = this.rechercheCriteria.livre != this.ALL ? this.rechercheCriteria.livre : "";
    param.dateArrete = this.rechercheCriteria.selectedDate != null ? JcifrsOutils.dateStructToBsInputDate(this.rechercheCriteria.selectedDate) : "";

    let listParametre = [];
    pageRecords.forEach((record) => {
        let ccbPcm = new CcbPcm();
        ccbPcm.ccbPcm = record.noCompte;
        ccbPcm.devise = record.devise;
        ccbPcm.codeEtablissement = record.tg;
        listParametre.push(ccbPcm);
    });
    param.listParametre = listParametre;

    return param;
}

private initPcmStatut(data: ListePcmStatut, pageNumber: number) {
    let listPcmStatut = data.listePcmStatut;

    let startFrom = (pageNumber-1) * 50;
    let endAt = startFrom + 50;
    if(endAt > this.results.length)
        endAt = this.results.length;

    listPcmStatut.forEach((pcmStatut) => {
        let ccbPcm = pcmStatut.ccbPcm;
        let codeEtablissement = pcmStatut.codeEtablissement;
        let devise = pcmStatut.devise;
        let statut = pcmStatut.statutJustification;

        for(let i = startFrom; i < endAt; i++) {
            // check if correct pcm, if true update status
            let pcm = this.results[i];
            if(pcm.noCompte == ccbPcm && pcm.tg == codeEtablissement && pcm.devise == devise)  {
                if(statut) {
                    pcm.statut_de_justification = this.statutJustificationSelectOption[statut];
                    pcm.statut_de_justification_id = statut;
                }
            }
        }
    });
    // this.results;
    this.loadedStatutPage[pageNumber.toString()] = true;
    // this.hideLoading();

    // call load statut api for the rest of the pages
    let pageCount = (this.results.length-1) / this.pagingSize + 1;
    if(pageNumber < pageCount) {
        let nextPage = pageNumber + 1;
        this.updateStatut(nextPage);
    }
}

private onPageChange($event) {
    console.log('clicked ' + $event.selectedPage);
    console.log(this.loadedStatutPage);
    if(this.loadedStatutPage[$event.selectedPage.toString()])
        return;
    this.showLoading();
    this.updateStatut($event.selectedPage);
    this.hideLoading();
}