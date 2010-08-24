#!/usr/bin/env python
"""
_DBSUpload.FindUploadableFiles_

Find the files in a datasets that needs to be uploaded to DBS

"""
__revision__ = "$Id: FindUploadableFiles.py,v 1.3 2008/11/05 01:20:45 afaq Exp $"
__version__ = "$Revision: 1.3 $"
__author__ = "anzar@fnal.gov"

import threading
import base64
from WMCore.Database.DBFormatter import DBFormatter

class FindUploadableFiles(DBFormatter):
    
    sql = """SELECT * FROM dbsbuffer_file where dataset=:dataset and FileStatus =:status LIMIT 10"""
    
    def __init__(self):
        myThread = threading.currentThread()
        DBFormatter.__init__(self, myThread.logger, myThread.dbi)
    
    def getBinds(self, dataset):
        binds =  { 'dataset': dataset['ID'], 'status':'NOTUPLOADED' }
        return binds

    def execute(self, datasetInfo=None, conn=None, transaction = False):
        binds = self.getBinds(datasetInfo)
        print "SQL: %s" %(self.sql)
        print "BINDS: %s" %str(binds)
        result = self.dbi.processData(self.sql, binds, 
                         conn = conn, transaction = transaction)
        return self.format(result)
    
