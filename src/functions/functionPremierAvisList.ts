import SyncStorage from 'sync-storage';
import { dateToFMDate } from '../utils/date';
import { get } from '../utils/toadConnectorFileMaker';

export async function getPremiersAvisLists(date = null, testMode = null) {
    let data = [];
    let requests = [];
    requests[0] = {};
    requests[0].Fields = {};
    requests[0].Type = 'Find';
    requests[0].Fields.SUJ_Nom = '*';
    requests[0].Fields._TEST = '=';

    if (testMode == null) {
        testMode = SyncStorage.get('testMode');
    }

    let dateFicCreerObj = new Date(); // ca sera pas toujours ca...

    if (date) {
        dateFicCreerObj = date;
    }

    requests[0].Fields.FIC_Creee_Le = dateToFMDate(dateFicCreerObj);
    if (testMode) {
        requests[0].Fields._TEST = '1';
    }

    let sortFields = [];
    sortFields[0] = {};
    sortFields[0].FieldName = 'FIC_Creee_Le';
    sortFields[0].SortOrder = 'Ascend';
    data = await get(
        global.layoutPremierAvisList,
        'FindRecords',
        requests,
        sortFields
    );

    return data;
}

export async function getPremierAvis(seqPv) {
    let data = [];
    let requests = [];
    requests[0] = {};
    requests[0].Fields = {};
    requests[0].Type = 'find';
    requests[0].Fields.No_Seq_PV = seqPv;
    data = await get(global.layoutPremierAvis, 'FindRecords', requests);

    return data;
}

export function getErrorMessageFM(code) {
    let listeErrorFm = getListeErrorFM();
    for (let i = 0; i < listeErrorFm.length; i++) {
        if (listeErrorFm[i].code == code) {
            return listeErrorFm[i].message;
        }
    }
    return '';
}


export async function getAllPremiersAvisGraphique(year = null, month = null, date = null) {
    let data = [];
    let requests = [];
    requests[0] = {};
    requests[0].Fields = {};
    requests[0].Type = "Find";
    requests[0].Fields.SUJ_Nom = "*";
    requests[0].Fields._TEST = "=";

    let dateStart = new Date();
    let dateEnd = new Date();
    let monthTemp = false;
    var lastDayOfMonth;

    if (year && !month) {
        dateStart.setYear(year);
        dateStart.setMonth(0);
        dateStart.setDate(1);
        lastDayOfMonth = new Date(dateStart.getFullYear(), dateStart.getMonth() + 1, 0).getDate();
        dateEnd.setFullYear(parseInt(year));
        dateEnd.setMonth(11);
        dateEnd.setDate(lastDayOfMonth);
    }


    if (year && month) {
        lastDayOfMonth = new Date(dateStart.getFullYear(), dateStart.getMonth() + 1, 0).getDate();
        monthTemp = month;
        monthTemp--;
        dateStart.setYear(year);
        dateStart.setMonth(monthTemp);
        dateStart.setDate(1);
        dateEnd.setFullYear(year);
        dateEnd.setMonth(parseInt(monthTemp));
        dateEnd.setDate(lastDayOfMonth);
    }

    if (date) {
        requests[0].Fields.FIC_Creee_Le = dateToFMDate(date);

    } else {
        requests[0].Fields.FIC_Creee_Le = dateToFMDate(dateStart) + ".." + dateToFMDate(dateEnd);

    }

    let testMode = SyncStorage.get('testMode');

    if (testMode) {
        requests[0].Fields._TEST = "1";
    }

    let sortFields = [];
    sortFields[0] = {};
    sortFields[0].FieldName = "FIC_Creee_Le";
    sortFields[0].SortOrder = "Descend";

    data = await get(
        global.layoutPremierAvisList,
        'FindRecords',
        requests,
        sortFields
    );

    return data;

}


export async function getAllPremiersAvis(year = null) {
    let data = [];
    let requests = [];
    requests[0] = {};
    requests[0].Fields = {};
    requests[0].Type = "Find";
    requests[0].Fields.SUJ_Nom = "*";
    requests[0].Fields._TEST = "=";

    let testMode = SyncStorage.get('testMode');


    let dateFicCreerObj = new Date(); // ca sera pas toujours ca...

    // if (date) {
    //     dateFicCreerObj = date;
    // }

    // requests[0].Fields.FIC_Creee_Le = dateToFMDate(dateFicCreerObj);
    if (testMode) {
        requests[0].Fields._TEST = "1";
    }

    let sortFields = [];
    sortFields[0] = {};
    sortFields[0].FieldName = "FIC_Creee_Le";
    sortFields[0].SortOrder = "Ascend";
    console.log("ICI");
    data = await get(
        global.layoutPremierAvisList,
        'FindRecords',
        requests,
        sortFields
    );

    return data;

}

export function getListeErrorFM() {

    let listErrorFm = [
        { code: -1, message: 'Unknown error' },
        { code: 0, message: 'No error' },
        { code: 1, message: 'User canceled action' },
        { code: 2, message: 'Memory error' },
        {
            code: 3,
            message:
                'Command is unavailable (for example, wrong operating system or mode)',
        },
        { code: 4, message: 'Command is unknown' },
        {
            code: 5,
            message:
                'Command is invalid (for example, a Set Field script step does not have a calculation specified)',
        },
        { code: 6, message: 'File is read-only' },
        { code: 7, message: 'Running out of memory' },
        { code: 8, message: 'Empty result' },
        { code: 9, message: 'Insufficient privileges' },
        { code: 10, message: 'Requested data is missing' },
        { code: 11, message: 'Name is not valid' },
        { code: 12, message: 'Name already exists' },
        { code: 13, message: 'File or object is in use' },
        { code: 14, message: 'Out of range' },
        { code: 15, message: "Can't divide by zero" },
        {
            code: 16,
            message: 'Operation failed; request retry (for example, a user query)',
        },
        {
            code: 17,
            message: 'Attempt to convert foreign character set to UTF-16 failed',
        },
        { code: 18, message: 'Client must provide account information to proceed' },
        {
            code: 19,
            message: 'String contains characters other than A-Z, a-z, 0-9 (ASCII)',
        },
        { code: 20, message: 'Command/operation canceled by triggered script' },
        {
            code: 21,
            message:
                'Request not supported (for example, when creating a hard link on a file system that does not support hard links)',
        },
        { code: 100, message: 'File is missing' },
        { code: 101, message: 'Record is missing' },
        { code: 102, message: 'Field is missing' },
        { code: 103, message: 'Relationship is missing' },
        { code: 104, message: 'Script is missing' },
        { code: 105, message: 'Layout is missing' },
        { code: 106, message: 'Table is missing' },
        { code: 107, message: 'Index is missing' },
        { code: 108, message: 'Value list is missing' },
        { code: 109, message: 'Privilege set is missing' },
        { code: 110, message: 'Related tables are missing' },
        { code: 111, message: 'Field repetition is invalid' },
        { code: 112, message: 'Window is missing' },
        { code: 113, message: 'Function is missing' },
        { code: 114, message: 'File reference is missing' },
        { code: 115, message: 'Menu set is missing' },
        { code: 116, message: 'Layout object is missing' },
        { code: 117, message: 'Data source is missing' },
        { code: 118, message: 'Theme is missing' },
        {
            code: 130,
            message: 'Files are damaged or missing and must be reinstalled',
        },
        {
            code: 131,
            message: 'Language pack files are missing (such as Starter Solutions)',
        },
        { code: 200, message: 'Record access is denied' },
        { code: 201, message: 'Field cannot be modified' },
        { code: 202, message: 'Field access is denied' },
        {
            code: 203,
            message:
                "No records in file to print, or password doesn't allow print access",
        },
        { code: 204, message: 'No access to field(s) in sort order' },
        {
            code: 205,
            message:
                'User does not have access privileges to create new records; import will overwrite existing data',
        },
        {
            code: 206,
            message:
                'User does not have password change privileges, or file is not modifiable',
        },
        {
            code: 207,
            message:
                'User does not have privileges to change database schema, or file is not modifiable',
        },
        { code: 208, message: 'Password does not contain enough characters' },
        { code: 209, message: 'New password must be different from existing one' },
        { code: 210, message: 'User account is inactive' },
        { code: 211, message: 'Password has expired' },
        {
            code: 212,
            message: 'Invalid user account and/or password; please try again',
        },
        { code: 213, message: 'User account and/or password does not exist' },
        { code: 214, message: 'Too many login attempts' },
        { code: 215, message: 'Administrator privileges cannot be duplicated' },
        { code: 216, message: 'Guest account cannot be duplicated' },
        {
            code: 217,
            message:
                'User does not have sufficient privileges to modify administrator account',
        },
        { code: 218, message: 'Password and verify password do not match' },
        { code: 300, message: 'File is locked or in use' },
        { code: 301, message: 'Record is in use by another user' },
        { code: 302, message: 'Table is in use by another user' },
        { code: 303, message: 'Database schema is in use by another user' },
        { code: 304, message: 'Layout is in use by another user' },
        { code: 306, message: 'Record modification ID does not match' },
        {
            code: 307,
            message:
                'Transaction could not be locked because of a communication error with the host',
        },
        { code: 308, message: 'Theme is locked and in use by another user' },
        { code: 400, message: 'Find criteria are empty' },
        { code: 401, message: 'No records match the request' },
        { code: 402, message: 'Selected field is not a match field for a lookup' },
        {
            code: 403,
            message:
                'Exceeding maximum record limit for trial version of FileMaker Pro',
        },
        { code: 404, message: 'Sort order is invalid' },
        {
            code: 405,
            message:
                'Number of records specified exceeds number of records that can be omitted',
        },
        { code: 406, message: 'Replace/reserialize criteria are invalid' },
        {
            code: 407,
            message: 'One or both match fields are missing (invalid relationship)',
        },
        {
            code: 408,
            message: 'Specified field has inappropriate data type for this operation',
        },
        { code: 409, message: 'Import order is invalid' },
        { code: 410, message: 'Export order is invalid' },
        {
            code: 412,
            message: 'Wrong version of FileMaker Pro used to recover file',
        },
        { code: 413, message: 'Specified field has inappropriate field type' },
        { code: 414, message: 'Layout cannot display the result' },
        {
            code: 415,
            message: 'One or more required related records are not available',
        },
        {
            code: 416,
            message: 'A primary key is required from the data source table',
        },
        { code: 417, message: 'File is not a supported data source' },
        { code: 418, message: 'Internal failure in INSERT operation into a field' },
        { code: 500, message: 'Date value does not meet validation entry options' },
        { code: 501, message: 'Time value does not meet validation entry options' },
        {
            code: 502,
            message: 'Number value does not meet validation entry options',
        },
        {
            code: 503,
            message:
                'Value in field is not within the range specified in validation entry options',
        },
        {
            code: 504,
            message:
                'Value in field is not unique, as required in validation entry options',
        },
        {
            code: 505,
            message:
                'Value in field is not an existing value in the file, as required in validation entry options',
        },
        {
            code: 506,
            message:
                'Value in field is not listed in the value list specified in validation entry option',
        },
        {
            code: 507,
            message:
                'Value in field failed calculation test of validation entry option',
        },
        { code: 508, message: 'Invalid value entered in Find mode' },
        { code: 509, message: 'Field requires a valid value' },
        { code: 510, message: 'Related value is empty or unavailable' },
        { code: 511, message: 'Value in field exceeds maximum field size' },
        { code: 512, message: 'Record was already modified by another user' },
        {
            code: 513,
            message: 'No validation was specified but data cannot fit into the field',
        },
        { code: 600, message: 'Print error has occurred' },
        { code: 601, message: 'Combined header and footer exceed one page' },
        {
            code: 602,
            message: "Body doesn't fit on a page for current column setup",
        },
        { code: 603, message: 'Print connection lost' },
        { code: 700, message: 'File is of the wrong file type for import' },
        { code: 706, message: 'EPSF file has no preview image' },
        { code: 707, message: 'Graphic translator cannot be found' },
        {
            code: 708,
            message:
                "Can't import the file, or need color monitor support to import file",
        },
        { code: 711, message: 'Import translator cannot be found' },
        { code: 714, message: 'Password privileges do not allow the operation' },
        {
            code: 715,
            message: 'Specified Excel worksheet or named range is missing',
        },
        {
            code: 716,
            message:
                'A SQL query using DELETE, INSERT, or UPDATE is not allowed for ODBC import',
        },
        {
            code: 717,
            message:
                'There is not enough XML/XSL information to proceed with the import or export',
        },
        { code: 718, message: 'Error in parsing XML file (from Xerces)' },
        { code: 719, message: 'Error in transforming XML using XSL (from Xalan)' },
        {
            code: 720,
            message:
                'Error when exporting; intended format does not support repeating fields',
        },
        {
            code: 721,
            message: 'Unknown error occurred in the parser or the transformer',
        },
        { code: 722, message: 'Cannot import data into a file that has no fields' },
        {
            code: 723,
            message:
                'You do not have permission to add records to or modify records in the target table',
        },
        {
            code: 724,
            message: 'You do not have permission to add records to the target table',
        },
        {
            code: 725,
            message:
                'You do not have permission to modify records in the target table',
        },
        {
            code: 726,
            message:
                'Source file has more records than the target table; not all records were imported',
        },
        {
            code: 727,
            message:
                'Target table has more records than the source file; not all records were updated',
        },
        {
            code: 729,
            message: 'Errors occurred during import; records could not be imported',
        },
        {
            code: 730,
            message:
                'Unsupported Excel version; convert file to the current Excel format and try again',
        },
        { code: 731, message: 'File you are importing from contains no data' },
        {
            code: 732,
            message: 'This file cannot be inserted because it contains other files',
        },
        { code: 733, message: 'A table cannot be imported into itself' },
        { code: 734, message: 'This file type cannot be displayed as a picture' },
        {
            code: 735,
            message:
                'This file type cannot be displayed as a picture; it will be inserted and displayed as a file',
        },
        {
            code: 736,
            message: 'Too much data to export to this format; data will be truncated',
        },
        { code: 738, message: 'The theme you are importing already exists' },
        { code: 800, message: 'Unable to create file on disk' },
        { code: 801, message: 'Unable to create temporary file on System disk' },
        { code: 802, message: 'Unable to open file' },
        { code: 803, message: 'File is single-user, or host cannot be found' },
        {
            code: 804,
            message: 'File cannot be opened as read-only in its current state',
        },
        { code: 805, message: 'File is damaged; use Recover command' },
        {
            code: 806,
            message: 'File cannot be opened with this version of FileMaker Pro',
        },
        {
            code: 807,
            message: 'File is not a FileMaker Pro file or is severely damaged',
        },
        {
            code: 808,
            message: 'Cannot open file because access privileges are damaged',
        },
        { code: 809, message: 'Disk/volume is full' },
        { code: 810, message: 'Disk/volume is locked' },
        {
            code: 811,
            message: 'Temporary file cannot be opened as FileMaker Pro file',
        },
        { code: 812, message: 'Exceeded host’s capacity' },
        { code: 813, message: 'Record synchronization error on network' },
        {
            code: 814,
            message: 'File(s) cannot be opened because maximum number is open',
        },
        { code: 815, message: 'Couldn’t open lookup file' },
        { code: 816, message: 'Unable to convert file' },
        {
            code: 817,
            message:
                'Unable to open file because it does not belong to this solution',
        },
        { code: 819, message: 'Cannot save a local copy of a remote file' },
        { code: 820, message: 'File is being closed' },
        { code: 821, message: 'Host forced a disconnect' },
        { code: 822, message: 'FMI files not found; reinstall missing files' },
        {
            code: 823,
            message: 'Cannot set file to single-user; guests are connected',
        },
        { code: 824, message: 'File is damaged or not a FileMaker file' },
        {
            code: 825,
            message: 'File is not authorized to reference the protected file',
        },
        { code: 826, message: 'File path specified is not a valid file path' },
        {
            code: 827,
            message:
                'File was not created because the source contained no data or is a reference',
        },
        { code: 850, message: 'Path is not valid for the operating system' },
        { code: 851, message: 'Cannot delete an external file from disk' },
        { code: 852, message: 'Cannot write a file to the external storage' },
        { code: 853, message: 'One or more containers failed to transfer' },
        { code: 900, message: 'General spelling engine error' },
        { code: 901, message: 'Main spelling dictionary not installed' },
        { code: 902, message: 'Could not launch the Help system' },
        { code: 903, message: 'Command cannot be used in a shared file' },
        { code: 905, message: 'Command requires a field to be active' },
        {
            code: 906,
            message:
                'Current file is not shared; command can be used only if the file is shared',
        },
        { code: 920, message: 'Cannot initialize the spelling engine' },
        { code: 921, message: 'User dictionary cannot be loaded for editing' },
        { code: 922, message: 'User dictionary cannot be found' },
        { code: 923, message: 'User dictionary is read-only' },
        { code: 951, message: 'An unexpected error occurred (*)' },
        { code: 954, message: 'Unsupported XML grammar (*)' },
        { code: 955, message: 'No database name (*)' },
        { code: 956, message: 'Maximum number of database sessions exceeded (*)' },
        { code: 957, message: 'Conflicting commands (*)' },
        { code: 958, message: 'Parameter missing (*)' },
        { code: 959, message: 'Custom Web Publishing technology is disabled' },
        { code: 960, message: 'Parameter is invalid' },
        { code: 1200, message: 'Generic calculation error' },
        { code: 1201, message: 'Too few parameters in the function' },
        { code: 1202, message: 'Too many parameters in the function' },
        { code: 1203, message: 'Unexpected end of calculation' },
        {
            code: 1204,
            message: 'Number, text constant, field name, or "(" expected',
        },
        { code: 1205, message: 'Comment is not terminated with "*/"' },
        { code: 1206, message: 'Text constant must end with a quotation mark' },
        { code: 1207, message: 'Unbalanced parenthesis' },
        {
            code: 1208,
            message: 'Operator missing, function not found, or "(" not expected',
        },
        {
            code: 1209,
            message: 'Name (such as field name or layout name) is missing',
        },
        { code: 1210, message: 'Plug-in function has already been registered' },
        { code: 1211, message: 'List usage is not allowed in this function' },
        {
            code: 1212,
            message: 'An operator (for example, +, -, *) is expected here',
        },
        {
            code: 1213,
            message: 'This variable has already been defined in the Let function',
        },
        {
            code: 1214,
            message:
                'AVERAGE, COUNT, EXTEND, GETREPETITION, MAX, MIN, NPV, STDEV, SUM, and GETSUMMARY: expression found where a field alone is needed',
        },
        {
            code: 1215,
            message: 'This parameter is an invalid Get function parameter',
        },
        {
            code: 1216,
            message:
                'Only summary fields are allowed as first argument in GETSUMMARY',
        },
        { code: 1217, message: 'Break field is invalid' },
        { code: 1218, message: 'Cannot evaluate the number' },
        { code: 1219, message: 'A field cannot be used in its own formula' },
        { code: 1220, message: 'Field type must be normal or calculated' },
        {
            code: 1221,
            message: 'Data type must be number, date, time, or timestamp',
        },
        { code: 1222, message: 'Calculation cannot be stored' },
        { code: 1223, message: 'Function referred to is not yet implemented' },
        { code: 1224, message: 'Function referred to does not exist' },
        {
            code: 1225,
            message: 'Function referred to is not supported in this context',
        },
        { code: 1300, message: "The specified name can't be used" },
        {
            code: 1301,
            message:
                'A parameter of the imported or pasted function has the same name as a function in the file',
        },
        {
            code: 1400,
            message:
                'ODBC client driver initialization failed; make sure ODBC client drivers are properly installed',
        },
        { code: 1401, message: 'Failed to allocate environment (ODBC)' },
        { code: 1402, message: 'Failed to free environment (ODBC)' },
        { code: 1403, message: 'Failed to disconnect (ODBC)' },
        { code: 1404, message: 'Failed to allocate connection (ODBC)' },
        { code: 1405, message: 'Failed to free connection (ODBC)' },
        { code: 1406, message: 'Failed check for SQL API (ODBC)' },
        { code: 1407, message: 'Failed to allocate statement (ODBC)' },
        { code: 1408, message: 'Extended error (ODBC)' },
        { code: 1409, message: 'Error (ODBC)' },
        { code: 1413, message: 'Failed communication link (ODBC)' },
        { code: 1414, message: 'SQL statement is too long' },
        { code: 1450, message: 'Action requires PHP privilege extension (*)' },
        { code: 1451, message: 'Action requires that current file be remote' },
        { code: 1501, message: 'SMTP authentication failed' },
        { code: 1502, message: 'Connection refused by SMTP server' },
        { code: 1503, message: 'Error with SSL' },
        {
            code: 1504,
            message: 'SMTP server requires the connection to be encrypted',
        },
        {
            code: 1505,
            message: 'Specified authentication is not supported by SMTP server',
        },
        { code: 1506, message: 'Email message(s) could not be sent successfully' },
        { code: 1507, message: 'Unable to log in to the SMTP server' },
        {
            code: 1550,
            message: 'Cannot load the plug-in, or the plug-in is not a valid plug-in',
        },
        {
            code: 1551,
            message:
                'Cannot install the plug-in; cannot delete an existing plug-in or write to the folder or disk',
        },
        { code: 1626, message: 'Protocol is not supported' },
        { code: 1627, message: 'Authentication failed' },
        { code: 1628, message: 'There was an error with SSL' },
        {
            code: 1629,
            message: 'Connection timed out; the timeout value is 60 seconds',
        },
        { code: 1630, message: 'URL format is incorrect' },
        { code: 1631, message: 'Connection failed' },
        {
            code: 1632,
            message:
                'Certificate cannot be authenticated by a supported certificate authority',
        },
        {
            code: 1633,
            message:
                'Certificate is valid but still causes an error (for example, the certificate has expired)',
        },
    ];


    for (let i = 0; i < listErrorFm.length; i++) {
        listErrorFm[i] = { ...listErrorFm[i], key: i };
    }

    return listErrorFm;

}

export async function getListeCasPresumer() {
    let dataFind = [];

    let requests = [];
    requests[0] = {};
    requests[0].Fields = {};
    requests[0].Type = 'find';
    requests[0].Fields.Nom_Type_Cas = '*';

    let sortFields = [];
    sortFields[0] = {};
    sortFields[0].FieldName = 'Nom_Type_Cas';
    sortFields[0].SortOrder = 'Descend';

    dataFind = await get(
        global.layoutTypeDeCas,
        'FindRecords',
        requests,
        sortFields
    );

    let typeCas = [];
    for (let i = 0; i < dataFind.length; i++) {
        typeCas[i] = {};
        typeCas[i].label = dataFind[i].Nom_Type_Cas;
        typeCas[i].value = dataFind[i].No_Seq_TypeCas;
    }

    return typeCas;
}
