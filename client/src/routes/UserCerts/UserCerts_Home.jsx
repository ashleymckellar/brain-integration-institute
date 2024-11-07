return (
    <>
    <Masthead/>
    <div className='user--certs--home'>
        <div className="progression--bar">
            <h3>
                100%
            </h3>
        </div>
        <p className="user--instructions">
            Follow these steps to submit your documentation for certification review.
        </p>
        <div className="user--certs--list">
            {/* userCerts.map(cert => ({
                <CertAccoridon
                status={accordion.status.complete{incomplete for incomplete assessments}} -- White button for incomplete, green button with checkmark for complete
                title={accordion.title}
                header={accordion.content.header}
                description={accordion.content.description}
                btnTxt={accordion.content.btnTxt}
                uploadButton={handleSubmitUpload()}
                />}) 
            */}
        </div>        
    </div>
    </>
)