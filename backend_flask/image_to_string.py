import easyocr
import sys


def image_to_list(fileName):
    detail = 0
    reader = easyocr.Reader(['en'])
    # need to run only once to load model into memory
    result = reader.readtext(fileName)
    areas = []

    for i in range(len(result)):
        areas.append((result[i][0][1][0]-result[i][0][0][0])*(result[i][0][2][1]-result[i][0][1][1]))

    areaindices = sorted(range(len(areas)), key=lambda k: areas[k], reverse=True)
    result_strings = []

    for j in range(len(areaindices)):
        result_strings.append(result[areaindices[j]][1])
    for k in range(len(result_strings)):
        result_strings[k] = result_strings[k].upper()

    print(result_strings)
    return(result_strings)
