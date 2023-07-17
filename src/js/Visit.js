export  class Visit
{
    constructor(visitPurpose ,description , urgency , fullName ,doctor)
    {
        this.visitPurpose = visitPurpose ; 
        this.description = description 
        this.urgency = urgency  ;
        this.fullName = fullName  ; 
        this.doctor = doctor

    }
    create()
    {
        console.log("Use extended clsses") ;
    }
    async getMyVisits()
    {
        try {
            const res = await fetch("https://ajax.test-danit.com/api/v2/cards", {
                method: 'GET',
                headers: {
                  'Authorization': `Bearer ${localStorage.getItem("token")}`
                },
              })
              
              const processedData  = await res.json() ;

              return processedData ;
              
        } catch (error) {
            console.log(error);
            
        }
    }
}
export class Cardiologist  extends Visit
{
    constructor(visitPurpose ,description , urgency , fullName , doctor ,normalBloodPreassure ,weight,prevDiagnose , age)
    {
        super(visitPurpose ,description , urgency , fullName,doctor)
        {
            this.normalBloodPreassure = normalBloodPreassure 
            this.weight = weight ;
            this.prevDiagnose =prevDiagnose ;
            this.age =age ;

        }
    }
    async create()
    {
        
       try {
        const res= await fetch("https://ajax.test-danit.com/api/v2/cards", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({
                visitPurpose: this.visitPurpose,
                description: this.description,
                urgency: this.urgency,
                fullName: this.fullName,
                doctor: this.doctor,
                normalBloodPreassure: this.normalBloodPreassure,
                weight: this.weight,
                prevDiagnose: this.prevDiagnose,
                age: this.age
            })
          })
          const processedData = await res.json() ;
          return processedData ;
       } catch (error) {
        console.log(error)
       }

    }

}

export class Dentist extends Visit{
    constructor(visitPurpose ,description , urgency , fullName , doctor ,lastVisitDate)
    {
        super(visitPurpose ,description , urgency , fullName,doctor)
        {
            this.lastVisitDate = lastVisitDate ;

        }
    }

    async create()
    {
        try {
            const res= await fetch("https://ajax.test-danit.com/api/v2/cards", {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({
                    visitPurpose: this.visitPurpose,
                    description: this.description,
                    urgency: this.urgency,
                    fullName: this.fullName,
                    doctor: this.doctor,
                   lastVisitDate : this.lastVisitDate
                })
              })
              const processedData = await res.json() ;
              return processedData ;
           } catch (error) {
            console.log(error)
        }


    }

}

export class Therapist extends Visit{ 

    constructor(visitPurpose ,description , urgency , fullName , doctor ,age)
    {
        super(visitPurpose ,description , urgency , fullName,doctor)
        {
            this.age = age ;

        }
    }   
    async create()
    {
        try {
            const res= await fetch("https://ajax.test-danit.com/api/v2/cards", {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({
                    visitPurpose: this.visitPurpose,
                    description: this.description,
                    urgency: this.urgency,
                    fullName: this.fullName,
                    doctor: this.doctor,
                   age : this.age
                })
              })
              const processedData = await res.json() ;
              return processedData ;
            

        } catch (error) {
            console.log(error)
        }
    }
}