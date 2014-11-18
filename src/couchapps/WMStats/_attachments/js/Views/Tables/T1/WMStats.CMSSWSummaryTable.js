WMStats.namespace("CMSSWSummaryTable");

WMStats.CMSSWSummaryTable = function (data, containerDiv) {
    
    var tableConfig = {
        "iDisplayLength": 50,
        "sScrollX": "",
        "aoColumns": [
            {"sTitle": "D", 
             "sDefaultContent": 0,
             "fnRender": function ( o, val ) {
                            return WMStats.Utils.formatDetailButton("detail");
                        }},
            {"sTitle": "L", 
             "sDefaultContent": 0,
             "fnRender": function ( o, val ) {
                            return WMStats.Utils.formatDetailButton("drill");
                        }},
            { "mDataProp": "key", "sTitle": "cmssw"},               
            { "mDataProp": function (source, type, val) { 
                              return source.summary.summaryStruct.numRequests;
                           }, "sTitle": "requests", "sDefaultContent": 0, 
            },
            { "sDefaultContent": 0,
              "sTitle": "job progress", 
              "mDataProp": function (source, type, val) { 
                            var cmsswSummary = source.summary;
                            var totalJobs = cmsswSummary.getWMBSTotalJobs() || 1;
                            var result = (cmsswSummary.getJobStatus("success") + cmsswSummary.getTotalFailure()) /
                                     totalJobs * 100;
                            return  (result.toFixed(1) + "%");
                          }
            },
            { "sDefaultContent": 0,
              "sTitle": "event progress", 
              "mDataProp": function (source, type, val) { 
                           //TODO this might not needed since input_events should be number not string. (for the legacy record)
                            var totalEvents = source.summary.summaryStruct.totalEvents || 1;
                            var result = source.summary.getAvgEvents() / totalEvents * 100;
                            return (result.toFixed(1) + "%");
                          }
            },
            { "sDefaultContent": 0,
              "sTitle": "lumi progress", 
              "mDataProp": function (source, type, val) { 
                           //TODO this might not needed since input_events should be number not string. (for the legacy record)
                            var totalLumis = source.summary.summaryStruct.totalLumis || 1;
                            var result = source.summary.getAvgLumis() / totalLumis * 100;
                            return (result.toFixed(1) + "%");
                          }
            },
            { "sDefaultContent": 0,
              "sTitle": "failure rate", 
              "mDataProp": function (source, type, val) { 
                           var cmsswSummary = source.summary;
                           var totalFailure = cmsswSummary.getTotalFailure();
                           var totalJobs = (cmsswSummary.getJobStatus("success") + totalFailure) || 1;
                           var result = totalFailure / totalJobs * 100;
                           return (result.toFixed(1)  + "%");
                          }
            },
            { "sDefaultContent": 0,
              "sTitle": "cool off ", 
              "mDataProp": function (source, type, val) {
                            var cmsswSummary = source.summary;
                            return (cmsswSummary.getTotalCooloff());
                          }
            }
        ]
    };
    tableConfig.aaData = data.getList();
    
    var filterConfig = {};
    
    return WMStats.Table(tableConfig).create(containerDiv,filterConfig);
};